import React, {useCallback, useMemo, useState} from "react";
import {Box, CircularProgress,} from "@mui/material";

import {CHAINS} from "../../utils/statsConsts";
import {ChainId} from "@certusone/wormhole-sdk";
import SimpleAreaChart from "./Charts/SimpleAreaChart";
import MultiLineChart, {LineChartData} from "./Charts/MultiLineChart";
import PercentBarChart from "./Charts/PercentBarChart";
import {
  useTransactionAreaChartData,
  useTransactionLineChartData,
  useTransactionTotals
} from "../../hooks/useTransactionTotals";
import {TIME_FRAMES} from "../../utils/consts";
import {useAreaChartTotal, useLineChartTotal} from "../../hooks/shared";
import StatsFrame from "./StatsFrame";
import {yAxisFormatter, yAxisPercentFormatter} from "../../utils/helpers";

const MessageStats = () => {
  const availableChains = CHAINS.map(info => info.id);
  const transactionTotals = useTransactionTotals();

  const displayByText = {count: "Message count", percent: "Percent"};
  const [displayBy, setDisplayBy] = useState(displayByText.count);
  const [selectedChains, setSelectedChains] = useState<ChainId[]>(availableChains);
  const [timeFrame, setTimeFrame] = useState("All time");

  const allChainsSelected = useMemo(
    () => selectedChains.length === availableChains.length,
    [availableChains, selectedChains]
  );
  const shouldShowPercentChart = useMemo(
    () => displayBy === displayByText.percent,
    [displayBy]
  );
  const shouldShowAreaChart = useMemo(
    () => allChainsSelected,
    [allChainsSelected, selectedChains]
  );

  const onDisplayByChange = useCallback(
    (event, nextValue) => nextValue && setDisplayBy(nextValue),
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
    [availableChains]
  );

  const onTimeFrameChange = useCallback(
    (event) => {
      const timeFrame = event.target.value;
      setTimeFrame(timeFrame);
    },
    []
  );

  const areaChartData = useTransactionAreaChartData(
    transactionTotals.data,
    TIME_FRAMES[timeFrame]
  );
  const areaChartTotal = useAreaChartTotal(areaChartData);
  const lineChartData: LineChartData[] = useTransactionLineChartData(
    transactionTotals.data,
    TIME_FRAMES[timeFrame],
    selectedChains
  );
  const lineChartTotal = useLineChartTotal(lineChartData);

  return (
    <React.StrictMode>
      <StatsFrame
        chartName='Message volume'
        chartTotal={
          (shouldShowAreaChart ? areaChartTotal : lineChartTotal).toLocaleString('en-US')
        }
        showTimeFrame={true}
        timeFrameText={timeFrame}
        displayByText={displayByText}
        displayByDefaultText={displayBy}
        onDisplayByChange={onDisplayByChange}
        selectedChains={selectedChains}
        onSelectedChainsChange={onSelectedChainsChange}
        availableChains={availableChains}
        allChainsSelected={allChainsSelected}
        onTimeFrameChange={onTimeFrameChange}
        showTotalLabel={true}
      >
        {transactionTotals.data ?
          (
            shouldShowPercentChart ?
              <PercentBarChart
                chainIds={selectedChains}
                data={lineChartData}
                timeFrame={TIME_FRAMES[timeFrame]}
                xAxisTickFormatter={TIME_FRAMES[timeFrame].tickFormatter}
                yAxisTickFormatter={yAxisPercentFormatter}/>
              :
              (
                allChainsSelected ?
                  <SimpleAreaChart
                    name="messages"
                    timeFrame={TIME_FRAMES[timeFrame]}
                    data={areaChartData}
                    xAxisTickFormatter={TIME_FRAMES[timeFrame].tickFormatter}
                    yAxisTickFormatter={yAxisFormatter}/>
                  :
                  <MultiLineChart
                    data={lineChartData}
                    timeFrame={TIME_FRAMES[timeFrame]}
                    yAxisTickFormatter={yAxisFormatter}
                    xAxisTickFormatter={TIME_FRAMES[timeFrame].tickFormatter}
                    chainIds={selectedChains}/>
              )
          )
          : (
            <Box
              sx={{
                flexBasis: {xs: "100%", md: "50%"},
                textAlign: "center",
                flexGrow: 1,
                backgroundColor: "rgba(255,255,255,.06)",
                backdropFilter: "blur(3px)",
                borderRadius: "4px",
                pt: {xs: 3, md: 6},
                pb: {xs: 3, md: 6},
                px: {xs: 3, md: 6},
              }}
            >
              <CircularProgress/>
            </Box>
          )
        }
      </StatsFrame>
    </React.StrictMode>
  )
}

export default MessageStats;
