import { Box, Card, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNetworkContext } from "../../contexts/NetworkContext";
import { ChainID } from "../../utils/consts";
import { BigTableMessage } from "../ExplorerSearch/ExplorerQuery";
import RecentMessages from "./RecentMessages";


export interface Totals {
  LastDayCount: { [groupByKey: string]: number };
  TotalCount: { [groupByKey: string]: number };
  DailyTotals: {
    // "2021-08-22": { "*": 0 },
    [date: string]: { [groupByKey: string]: number };
  };
}
// type GroupByKey = "*" | "emitterChain" | "emitterChain:emitterAddress"
export interface Recent {
  [groupByKey: string]: Array<BigTableMessage>;
}
interface BidirectionalTransferData {
  [leavingChainId: string]: {
    [destinationChainId: string]: {
      [tokenSymbol: string]: number;
    };
  };
}
export interface NotionalTransferred {
  Last24Hours: BidirectionalTransferData;
  WithinPeriod: BidirectionalTransferData;
  PeriodDurationDays: Number;
  Daily: {
    [date: string]: BidirectionalTransferData;
  };
}
interface DirectionalTransferData {
  [chainId: string]: {
    [tokenSymbol: string]: number;
  };
}
export interface NotionalTransferredTo {
  Last24Hours: DirectionalTransferData;
  WithinPeriod: DirectionalTransferData;
  PeriodDurationDays: Number;
  Daily: {
    [date: string]: DirectionalTransferData;
  };
}
export interface NotionalTransferredToCumulative {
  AllTime: DirectionalTransferData;
  AllTimeDurationDays: Number;
  Daily: {
    [date: string]: DirectionalTransferData;
  };
}
interface LockedAsset {
  Symbol: string
  Name: string
  Address: string
  CoinGeckoId: string
  Amount: number
  Notional: number
  TokenPrice: number
}
interface LockedAssets {
  [tokenAddress: string]: LockedAsset
}
interface ChainsAssets {
  [chainId: string]: LockedAssets
}
export interface NotionalTvl {
  Last24HoursChange: ChainsAssets
  AllTime: ChainsAssets
}

type GroupBy = undefined | "chain" | "address";
type ForChain = undefined | StatsProps["emitterChain"];
type ForAddress = undefined | StatsProps["emitterAddress"];

interface StatsProps {
  emitterChain?: number;
  emitterAddress?: string;
}

const ExplorerStats: React.FC<StatsProps> = ({
  emitterChain,
  emitterAddress,
}) => {
  const { activeNetwork } = useNetworkContext();

  const [totals, setTotals] = useState<Totals>();
  const [recent, setRecent] = useState<Recent>();
  const [notionalTransferred, setNotionalTransferred] =
    useState<NotionalTransferred>();
  const [notionalTransferredTo, setNotionalTransferredTo] =
    useState<NotionalTransferredTo>();
  const [notionalTransferredToCumulative, setNotionalTransferredToCumulative] =
    useState<NotionalTransferredToCumulative>();
  const [address, setAddress] = useState<StatsProps["emitterAddress"]>();
  const [chain, setChain] = useState<StatsProps["emitterChain"]>();
  const [lastFetched, setLastFetched] = useState<number>();
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout>();
  const [controller, setController] = useState<AbortController>(
    new AbortController()
  );

  const launchDate = new Date("2021-09-13T00:00:00.000+00:00");
  // calculate the time difference between now and the launch day
  const differenceInTime = new Date().getTime() - launchDate.getTime();
  // calculate the number of days, rounding up
  const daysSinceDataStart = Math.ceil(differenceInTime / (1000 * 3600 * 24));



  const fetchRecent = (
    baseUrl: string,
    groupBy: GroupBy,
    forChain: ForChain,
    forAddress: ForAddress,
    signal: AbortSignal
  ) => {
    const recentUrl = `${baseUrl}recent`;
    let numRows = 10
    if (forChain) {
      numRows = 30
    }
    if (forAddress) {
      numRows = 80
    }
    let url = `${recentUrl}?numRows=${numRows}`;
    if (groupBy) {
      url = `${url}&groupBy=${groupBy}`;
    }
    if (forChain) {
      url = `${url}&forChain=${forChain}`;
    }
    if (forAddress) {
      url = `${url}&forAddress=${forAddress}`;
    }

    return fetch(url, { signal })
      .then<Recent>((res) => {
        if (res.ok) return res.json();
        // throw an error with specific message, rather than letting the json decoding throw.
        throw "explorer.stats.failedFetchingRecent";
      })
      .then(
        (result) => {
          setRecent(result);
          setLastFetched(Date.now());
        },
        (error) => {
          if (error.name !== "AbortError") {
            //  handle errors here instead of a catch(), so that we don't swallow exceptions from components
            console.error("failed fetching recent. error: ", error);
          }
        }
      );
  };

  const getData = (props: StatsProps, baseUrl: string, signal: AbortSignal, func: (baseUrl: string,
    recentGroupBy: GroupBy,
    totalsGroupBy: GroupBy,
    forChain: ForChain,
    forAddress: string | undefined,
    signal: AbortSignal) => Promise<any>) => {
    let forChain: ForChain = undefined;
    let forAddress: ForAddress = undefined;
    let recentGroupBy: GroupBy = undefined;
    let totalsGroupBy: GroupBy = "chain";
    if (props.emitterChain) {
      forChain = props.emitterChain;
      totalsGroupBy = "address";
      recentGroupBy = "address";
    }
    if (props.emitterChain && props.emitterAddress) {
      forAddress = props.emitterAddress;
    }
    return func(baseUrl, recentGroupBy, totalsGroupBy, forChain, forAddress, signal)
  };
  
  const getAllEndpoints = (
    baseUrl: string,
    recentGroupBy: GroupBy,
    totalsGroupBy: GroupBy,
    forChain: ForChain,
    forAddress: string | undefined,
    signal: AbortSignal) => {
    return Promise.all([
      fetchRecent(baseUrl, recentGroupBy, forChain, forAddress, signal),
    ]);
  };
  const getRecents = (
    baseUrl: string,
    recentGroupBy: GroupBy,
    totalsGroupBy: GroupBy,
    forChain: ForChain,
    forAddress: string | undefined,
    signal: AbortSignal) => fetchRecent(baseUrl, recentGroupBy, forChain, forAddress, signal)


  const pollingController = (
    emitterChain: StatsProps["emitterChain"],
    emitterAddress: StatsProps["emitterAddress"],
    baseUrl: string,
  ) => {
    // clear any ongoing intervals
    if (pollInterval) {
      clearInterval(pollInterval);
      setPollInterval(undefined);
    }
    // abort any in-flight requests
    controller.abort();
    // create a new controller for the new fetches, add it to state
    const newController = new AbortController();
    setController(newController);
    // create a signal for requests
    const { signal } = newController;
    // start polling
    let interval = setInterval(() => {
      getData({ emitterChain, emitterAddress }, baseUrl, signal, getRecents);
    }, 30000);
    setPollInterval(interval);
  };

  useEffect(() => {
    // getData if first load (no totals or recents), or emitterAddress/emitterChain changed.
    if (
      (!totals && !recent) ||
      emitterAddress !== address ||
      emitterChain !== chain
    ) {
      const newController = new AbortController();
      setController(newController);
      getData(
        { emitterChain, emitterAddress },
        activeNetwork.endpoints.bigtableFunctionsBase,
        newController.signal,
        getAllEndpoints
      );
    }
    setTotals(undefined);
    setRecent(undefined);
    setNotionalTransferred(undefined);
    setNotionalTransferredTo(undefined);
    setNotionalTransferredToCumulative(undefined);

    pollingController(
      emitterChain,
      emitterAddress,
      activeNetwork.endpoints.bigtableFunctionsBase
    );
    // hold chain & address in state to detect changes
    setChain(emitterChain);
    setAddress(emitterAddress);
  }, [
    emitterChain,
    emitterAddress,
    activeNetwork.endpoints.bigtableFunctionsBase,
  ]);

  useEffect(() => {
    return function cleanup() {
      controller.abort();
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [pollInterval, activeNetwork.endpoints.bigtableFunctionsBase]);

  let title = "Recent messages";
  let hideTableTitles = false;
  if (emitterChain) {
    title = `Recent ${ChainID[Number(emitterChain)]} messages`;
  }

  return (
    <>
      {!totals && !recent ? (
        <Card
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            border: '1px solid rgba(255, 255, 255, .3)',
            backdropFilter: 'blur(15px)',
            padding: "24px",
            textAlign: "center",
            p: 3,
          }}
        >
          <CircularProgress />
        </Card>
      ) : (
        <>
          {recent && (
            <Box style={{ margin: "40px 0" }}>
              <RecentMessages
                recent={recent}
                lastFetched={lastFetched}
                title={title}
                hideTableTitles={hideTableTitles}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default ExplorerStats;
