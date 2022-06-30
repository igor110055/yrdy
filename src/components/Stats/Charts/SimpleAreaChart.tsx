import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import React from "react";
import {TickFormatter, TimeFrame} from "../../../types/stats";
import CustomTooltip from "./CustomTooltip";
import CustomTooltip2 from "./CustomTooltip2";
import { useTheme, useMediaQuery } from "@mui/material";


export interface AreaChartData {
  date: string;
  value: number;
}

interface AreaChartProps {
  name?: string;
  timeFrame: TimeFrame;
  data: AreaChartData[];
  xAxisTickFormatter: TickFormatter;
  yAxisTickFormatter: TickFormatter;
}

const SimpleAreaChart: React.FC<AreaChartProps> = (props: AreaChartProps) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  

  return <ResponsiveContainer height={452}>
    <AreaChart data={props.data}>
      <XAxis
        dataKey="date"
        tickFormatter={props.xAxisTickFormatter}
        tick={{fill: "white", fontSize: 12}}
        // interval={props.timeFrame.interval}
        interval= {!isMobile ? props.timeFrame.interval : undefined}
        axisLine={false}
        tickLine={false}
        padding={{ left: 2, right: 0}}
      />
      <YAxis
        tick={{fill: "white", fontSize: 12}}
        tickFormatter={props.yAxisTickFormatter}
        axisLine={false}
        tickLine={false}
        width={50}
      />

      {props.name =='total value locked' ? (
        <Tooltip content={<CustomTooltip title={'TVL'} valueFormatter={props.yAxisTickFormatter} />} />
      ):(
         <Tooltip content={<CustomTooltip2  valueFormatter={props.yAxisTickFormatter} />} />
      )}
        
      
      
      <defs>
        <linearGradient id="simpleAreaGradient" gradientTransform="rotate(100)">
          <stop stopColor="white"/>
          <stop offset="1" stopColor="white" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      <Area dataKey="value" fill="url(#simpleAreaGradient)" stroke="none"/>
    </AreaChart>
  </ResponsiveContainer>

}

export default SimpleAreaChart;
