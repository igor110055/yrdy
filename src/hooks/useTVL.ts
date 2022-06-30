import {ChainId} from "@certusone/wormhole-sdk";
import axios from "axios";
import {useEffect, useState} from "react";
import {DataWrapper, errorDataWrapper, fetchDataWrapper, receiveDataWrapper,} from "../utils/helpers";
import {COIN_GECKO_IMAGE_URLS} from "../utils/coinGecko";
import {CHAINS_BY_ID} from "../utils/statsConsts";
import {useNetworkContext} from "../contexts/NetworkContext";
import {HorizontalBarChartData} from "../components/Stats/Charts/HorizontalBarChart";


export type TVL = {
  logo?: string;
  symbol?: string;
  name?: string;
  amount: string;
  totalValue?: number;
  quotePrice?: number;
  assetAddress: string;
  originChainId: ChainId;
  originChain: string;
  decimals?: number;
};

interface LockedAsset {
  Symbol: string;
  Name: string;
  Address: string;
  CoinGeckoId: string;
  Amount: number;
  Notional: number;
  TokenPrice: number;
}

interface LockedAssets {
  [tokenAddress: string]: LockedAsset;
}

interface ChainsAssets {
  [chainId: string]: LockedAssets;
}

export interface NotionalTVL {
  Last24HoursChange: ChainsAssets;
  AllTime: ChainsAssets;
}

export const getTVLDetailData = (notionalTvl: NotionalTVL): TVL[] => {
  const tvl: TVL[] = [];
  for (const [chainId, chainAssets] of Object.entries(notionalTvl.AllTime)) {
    if (chainId === "*") continue;
    const originChainId = +chainId as ChainId;
    const originChain =
      CHAINS_BY_ID[originChainId]?.name || `Unknown [${chainId}]`;
    for (const [tokenAddress, lockedAsset] of Object.entries(chainAssets)) {
      if (tokenAddress === "*") continue;
      tvl.push({
        logo: COIN_GECKO_IMAGE_URLS[lockedAsset.CoinGeckoId],
        symbol: lockedAsset.Symbol,
        name: lockedAsset.Name,
        amount: lockedAsset.Amount.toString(),
        totalValue: lockedAsset.Notional,
        quotePrice: lockedAsset.TokenPrice,
        assetAddress: tokenAddress,
        originChainId,
        originChain,
      });
    }
  }
  return tvl;
};

const getBarData = (totals: NotionalTVL): HorizontalBarChartData[] => {
  if (!totals) {
    return [];
  }

  const allTime = totals.AllTime;
  const chains = Object.keys(allTime).filter(value => value !== '*');

  return chains.map(id => {
    const idAsNumber = parseInt(id);
    const chainId: ChainId = idAsNumber as ChainId;

    return {
      id: idAsNumber,
      name: CHAINS_BY_ID[chainId].name,
      value: allTime[id]['*'].Notional
    } as HorizontalBarChartData;
  });
}

export const useTVLHorizontalBarChartData = (
  totals: NotionalTVL | null,
): HorizontalBarChartData[] => {
  const [data, setData] = useState<HorizontalBarChartData[]>([]);

  useEffect(() => {
    if (totals) {
      setData(getBarData(totals));
    }
  }, [totals]);

  return data;
}

export const useTVLDetailTableData = (
  totals: NotionalTVL | null,
): TVL[] => {
  const [data, setData] = useState<TVL[]>([]);

  useEffect(() => {
    if (totals) {
      setData(getTVLDetailData(totals));
    }
  }, [totals]);

  return data;
}

export const useTVL = () => {
  const {activeNetwork} = useNetworkContext();
  const url = `${activeNetwork.endpoints.bigtableFunctionsBase}notionaltvl`;
  const [tvl, setTvl] = useState<DataWrapper<NotionalTVL>>(fetchDataWrapper());

  useEffect(() => {
    let cancelled = false;
    axios
      .get<NotionalTVL>(url)
      .then((response) => {
        if (!cancelled) {
          setTvl(receiveDataWrapper(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
        if (!cancelled) {
          setTvl(errorDataWrapper(error));
        }
      });
    return () => {
      cancelled = true;
    };


  }, []);

  return tvl
}
