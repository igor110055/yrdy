import React, {useCallback, useEffect, useMemo, useState} from "react";
import {CircularProgress,} from "@mui/material";

import {ChainInfo, CHAINS_BY_ID} from "../../utils/statsConsts";
import {ChainId} from "@certusone/wormhole-sdk";
import {TIME_FRAMES} from "../../utils/consts";
import SimpleAreaChart, {AreaChartData} from "./Charts/SimpleAreaChart";
import MultiLineChart, {LineChartData} from "./Charts/MultiLineChart";
import {
  useCumulativeTVL,
  useCumulativeTVLAreaChartData,
  useCumulativeTVLLineChartData
} from "../../hooks/useCumulativeTVL";
import {useHorizontalBarChartTotal} from "../../hooks/shared";
import StatsFrame from "./StatsFrame";
import {TVL, useTVL, useTVLDetailTableData, useTVLHorizontalBarChartData} from "../../hooks/useTVL";
import HorizontalBarChart, {HorizontalBarChartData} from "./Charts/HorizontalBarChart";
import {numberFormatter, yAxisCurrencyFormatter} from "../../utils/helpers";
import TVLDetailTable from "./TVLDetailTable";

const TVLStats = () => {
  const {data: cumulativeTVL} = useCumulativeTVL();
  const {data: tvl} = useTVL();

  const displayByText = {time: "Time", chain: "Chain"};
  const [displayBy, setDisplayBy] = useState<string>(displayByText.time);
  const [showTimeFrame, setShowTimeFrame] = useState<boolean>(true);
  const [availableChains, setAvailableChains] = useState<ChainId[]>([]);
  const [selectedChains, setSelectedChains] = useState<ChainId[]>(availableChains);
  const [selectedChainDetail, setSelectedChainDetail] = useState<ChainInfo | null>(null);
  const [timeFrame, setTimeFrame] = useState<string>("All time");

  const allChainsSelected = useMemo(
    () => selectedChains.length === availableChains.length,
    [availableChains, selectedChains]
  );

  const onDisplayByChange = useCallback(
    (event, nextValue) => {
      if (nextValue) {
        setDisplayBy(nextValue);
        setShowTimeFrame(nextValue !== displayByText.chain);
      }
    },
    []
  );
  const onTimeFrameChange = useCallback(
    (event) => {
      const timeFrame = event.target.value;
      setTimeFrame(timeFrame);
    },
    []
  );
  const onSelectedChainsChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (value[value.length - 1] === "all") {
        setSelectedChains((prevValue) =>
          prevValue.length === availableChains.length ? [] : availableChains
        );
      } else {
        setSelectedChains(value);
      }
    },
    [availableChains, selectedChains]
  );

  const areaChartData: AreaChartData[] = useCumulativeTVLAreaChartData(
    cumulativeTVL,
    TIME_FRAMES[timeFrame]
  );

  const lineChartData: LineChartData[] = useCumulativeTVLLineChartData(
    cumulativeTVL,
    TIME_FRAMES[timeFrame],
    selectedChains
  );

  const horizontalBarChartData: HorizontalBarChartData[] = useTVLHorizontalBarChartData(tvl);
  const tvlDetailTableData: TVL[] = useTVLDetailTableData(tvl);
  const horizontalBarChartTotal: number = useHorizontalBarChartTotal(horizontalBarChartData);

  const onAssetClick = useCallback(
    (chain: ChainInfo) => {
      setSelectedChainDetail(chain);
    },
    []
  );

  const onBackClick = useCallback(
    () => {
      setSelectedChainDetail(null);
    },
    []
  );

  useEffect(() => {
    if (cumulativeTVL) {
      const chains = Object.keys(
        Object.values(cumulativeTVL.DailyLocked)[0] || {}
      ).reduce<ChainId[]>((chainIds, key) => {
        if (key !== "*") {
          const chainId = parseInt(key) as ChainId;
          if (CHAINS_BY_ID[chainId]) {
            chainIds.push(chainId);
          }
        }
        return chainIds;
      }, []);

      setAvailableChains(chains);
      if (selectedChains.length === 0) {
        setSelectedChains(chains);
      }
    }
  }, [cumulativeTVL]);

  return (
    <React.StrictMode>
      {
        selectedChainDetail ?
          <TVLDetailTable
            data={tvlDetailTableData.filter(tvl => tvl.originChainId === selectedChainDetail?.id)}
            chain={selectedChainDetail}
            onBackClick={onBackClick}
          />
          :
          <StatsFrame
            chartName='Total Value Locked'
            chartTotal={numberFormatter(horizontalBarChartTotal, 0)}
            showTimeFrame={showTimeFrame}
            timeFrameText={timeFrame}
            displayByText={displayByText}
            displayByDefaultText={displayBy}
            onDisplayByChange={onDisplayByChange}
            selectedChains={selectedChains}
            onSelectedChainsChange={onSelectedChainsChange}
            availableChains={availableChains}
            allChainsSelected={allChainsSelected}
            onTimeFrameChange={onTimeFrameChange}
            showTotalLabel={false}

          >
            {cumulativeTVL && tvl ? (
              displayBy === "Time" ? (
                allChainsSelected ? (
                  <SimpleAreaChart
                    name="total value locked"
                    timeFrame={TIME_FRAMES[timeFrame]}
                    data={areaChartData}
                    xAxisTickFormatter={TIME_FRAMES[timeFrame].tickFormatter}
                    yAxisTickFormatter={yAxisCurrencyFormatter}
                  />
                ) : (
                  <MultiLineChart
                    data={lineChartData}
                    timeFrame={TIME_FRAMES[timeFrame]}
                    yAxisTickFormatter={yAxisCurrencyFormatter}
                    xAxisTickFormatter={TIME_FRAMES[timeFrame].tickFormatter}
                    chainIds={selectedChains}
                  />
                )

              ) : !selectedChainDetail &&
                <HorizontalBarChart
                  data={horizontalBarChartData}
                  totalTVL={horizontalBarChartTotal}
                  onAssetClick={onAssetClick}
                />
            ) : <CircularProgress/>
            }
          </StatsFrame>
      }
    </React.StrictMode>
  )
}

export default TVLStats
