import {AreaChartData} from "../components/Stats/Charts/SimpleAreaChart";
import {useEffect, useState} from "react";
import {LineChartData} from "../components/Stats/Charts/MultiLineChart";
import {HorizontalBarChartData} from "../components/Stats/Charts/HorizontalBarChart";

export const useAreaChartTotal = (areaChartData: AreaChartData[]): number => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(areaChartData.reduce<number>((acc, data) => acc + data.value, 0));

  }, [areaChartData]);

  return total;
}

export const useHorizontalBarChartTotal = (horizontalBarChartData: HorizontalBarChartData[]): number => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(horizontalBarChartData.reduce<number>((acc, data) => acc + data.value, 0));

  }, [horizontalBarChartData]);

  return total;
}

export const useLineChartTotal = (lineChartData: LineChartData[]): number => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(lineChartData.reduce<number>((total, {values}) => {
      const dateTotal = Object.values(values).reduce((dateTotal, {value}) => dateTotal + value, 0);
      return total + dateTotal;
    }, 0));

  }, [lineChartData]);

  return total;
}

