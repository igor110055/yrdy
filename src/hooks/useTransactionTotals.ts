import {useEffect, useState} from "react";
import axios from "axios";
import {DataWrapper, errorDataWrapper, fetchDataWrapper, receiveDataWrapper,} from "../utils/helpers";
import {useNetworkContext} from "../contexts/NetworkContext";
import {AreaChartData} from "../components/Stats/Charts/SimpleAreaChart";
import {TimeFrame} from "../types/stats";
import {getDayDatesForDuration} from "../utils/time";
import {ChainId} from "@certusone/wormhole-sdk";
import {LineChartData} from "../components/Stats/Charts/MultiLineChart";
import {CHAINS_BY_ID} from "../utils/statsConsts";


export interface Totals {
  TotalCount: { [chainId: string]: number };
  DailyTotals: {
    // "2021-08-22": { "*": 0 },
    [date: string]: { [groupByKey: string]: number };
  };
}

const getAreaDayData = (totals: Totals, timeFrame: TimeFrame, groupBy: string | number = '*'): AreaChartData[] => {
  let chartData: AreaChartData[] = [];
  if (!totals) {
    return chartData;
  }

  const dailyTotals = totals.DailyTotals;
  const dates = getDayDatesForDuration(Object.keys(dailyTotals), timeFrame);
  chartData = dates
    .reduce(
      (accum, key) => [...accum, {date: key, value: dailyTotals[key][groupBy]}],
      chartData
    );

  return chartData;
}

const getLineDayData = (totals: Totals | undefined, timeFrame: TimeFrame, chains: ChainId[]) => {
  let chartData: LineChartData[] = [];
  if (!totals) {
    return [];
  }

  const dailyTotals = totals.DailyTotals;
  const dates = getDayDatesForDuration(Object.keys(dailyTotals), timeFrame);
  const chainTotalsPerDay = chains.reduce((acc, id) => {
    return {
      ...acc,
      [id]: getAreaDayData(totals, timeFrame, id)
        .reduce((dayData, data) => {
          return {...dayData, [data.date]: data.value}
        }, Object())
    }
  }, Object());

  chartData = dates.map<LineChartData>(date => ({
    date,
    values: chains.reduce((acc, id) => {
      return {
        ...acc,
        [id]: {
          id: id,
          name: CHAINS_BY_ID[id].name,
          value: chainTotalsPerDay[id][date]
        }
      }
    }, Object())
  }));

  return chartData;
}

export const useTransactionAreaChartData = (totals: Totals | null, timeFrame: TimeFrame): AreaChartData[] => {
  const [data, setData] = useState<AreaChartData[]>([]);

  useEffect(() => {
    if (totals) {
      setData(getAreaDayData(totals, timeFrame));
    }
  }, [totals, timeFrame]);

  return data;
}

export const useTransactionLineChartData = (totals: Totals | null, timeFrame: TimeFrame, chains: ChainId[]): LineChartData[] => {
  const [data, setData] = useState<LineChartData[]>([]);

  useEffect(() => {
    if (totals) {
      setData(getLineDayData(totals, timeFrame, chains));
    }
  }, [totals, timeFrame, chains]);

  return data;
}

export const useTransactionTotals = () => {
  const {activeNetwork} = useNetworkContext();
  const url = `${activeNetwork.endpoints.bigtableFunctionsBase}totals?daily=true&groupBy=chain`;
  const [totals, setTotals] = useState<DataWrapper<Totals>>(fetchDataWrapper());

  useEffect(() => {
    let cancelled = false;
    axios
      .get<Totals>(url)
      .then((response) => {
        if (!cancelled) {
          setTotals(receiveDataWrapper(response.data));
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setTotals(errorDataWrapper(error));
          console.log(error);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [activeNetwork.endpoints.bigtableFunctionsBase]);

  return totals;
};
