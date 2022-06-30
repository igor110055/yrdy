import {useEffect, useState} from "react";
import axios from "axios";
import {DataWrapper, errorDataWrapper, fetchDataWrapper, receiveDataWrapper,} from "../utils/helpers";

import {CHAINS_BY_ID} from "../utils/statsConsts";
import {TimeFrame} from "../types/stats";
import {AreaChartData} from "../components/Stats/Charts/SimpleAreaChart";
import {getDayDatesForDuration, getMonthDatesForDuration} from "../utils/time";
import {DateTime} from "luxon";
import {ChainId} from "@certusone/wormhole-sdk";
import {LineChartData} from "../components/Stats/Charts/MultiLineChart";
import {useNetworkContext} from "../contexts/NetworkContext";

export interface LockedAsset {
  Symbol: string;
  Name: string;
  Address: string;
  CoinGeckoId: string;
  Amount: number;
  Notional: number;
  TokenPrice: number;
}

export interface LockedAssets {
  [tokenAddress: string]: LockedAsset;
}

export interface ChainsAssets {
  [chainId: string]: LockedAssets;
}

export interface NotionalTVLCumulative {
  DailyLocked: {
    [date: string]: ChainsAssets;
  };
}

const getAreaDayTotal = (dayData: ChainsAssets, groupBy: string | number = '*'): number => {
  return dayData[groupBy]['*'].Notional;
}

const getAreaDayData = (totals: NotionalTVLCumulative, timeFrame: TimeFrame, groupBy: string | number = '*'): AreaChartData[] => {
  if (!totals) {
    return [];
  }

  const dailyTotals = totals.DailyLocked;
  const dates = getDayDatesForDuration(Object.keys(dailyTotals), timeFrame);
  return dates
    .reduce<AreaChartData[]>(
      (data, key) => [
        ...data,
        {
          date: key,
          value: getAreaDayTotal(dailyTotals[key], groupBy)
        }
      ],
      []
    );
}

const getAreaMonthData = (totals: NotionalTVLCumulative, timeFrame: TimeFrame, groupBy: string | number = '*'): AreaChartData[] => {
  if (!totals) {
    return [];
  }

  const dailyTotals = totals.DailyLocked;
  const months = getMonthDatesForDuration(timeFrame);

  return months.map(month => {
    let total = Object.keys(dailyTotals)
      .filter(day => DateTime.fromISO(month).hasSame(DateTime.fromISO(day), 'day'))
      .reduce<number>((acc, key) => {
        return acc + getAreaDayTotal(dailyTotals[key], groupBy);
      }, 0);

    return {date: month, value: total};
  });
}

const getLineDayData = (totals: NotionalTVLCumulative, timeFrame: TimeFrame, chains: ChainId[]): LineChartData[] => {
  if (!totals) {
    return [];
  }

  const dailyTotals = totals.DailyLocked;
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

  return dates.map<LineChartData>(date => ({
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
}

export const useCumulativeTVLAreaChartData = (
  totals: NotionalTVLCumulative | null,
  timeFrame: TimeFrame
): AreaChartData[] => {
  const [data, setData] = useState<AreaChartData[]>([]);

  useEffect(() => {
    if (totals) {
      setData(getAreaDayData(totals, timeFrame));
    }
  }, [totals, timeFrame]);

  return data;
};

export const useCumulativeTVLLineChartData = (
  totals: NotionalTVLCumulative | null,
  timeFrame: TimeFrame,
  chains: ChainId[]
): LineChartData[] => {
  const [data, setData] = useState<LineChartData[]>([]);

  useEffect(() => {
    if (totals) {
      setData(getLineDayData(totals, timeFrame, chains));
    }
  }, [totals, timeFrame, chains]);

  return data;
}

export const useCumulativeTVL = () => {
  const {activeNetwork} = useNetworkContext();
  const url = `${activeNetwork.endpoints.bigtableFunctionsBase}notionaltvlcumulative?totalsOnly=true`;
  const [cumulativeTVL, setCumulativeTVL] = useState<DataWrapper<NotionalTVLCumulative>>(fetchDataWrapper());

  useEffect(() => {
    let cancelled = false;
    axios
      .get<NotionalTVLCumulative>(url)
      .then((response) => {
        if (!cancelled) {
          setCumulativeTVL(receiveDataWrapper(response.data));
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setCumulativeTVL(errorDataWrapper(error));
        }
        console.log(error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return cumulativeTVL;
};
