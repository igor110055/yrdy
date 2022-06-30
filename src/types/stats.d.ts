import {Duration} from "luxon";
import {AxisInterval} from "recharts/types/util/types";

export type TickFormatter = (value: any) => string;

export interface TimeFrame {
  interval: AxisInterval;
  duration: Duration;
  tickFormatter: TickFormatter;
}

type ReChartData = { [dataKey: string]: number | string };
