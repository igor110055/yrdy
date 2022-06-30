import {Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip} from "recharts";
import React from "react";
import {ChainInfo, CHAINS_BY_ID, COLOR_BY_CHAIN_ID} from "../../../utils/statsConsts";
import {ChainId} from "@certusone/wormhole-sdk";
import {ReChartData, TickFormatter, TimeFrame} from "../../../types/stats";
import {ChainID} from "../../../utils/consts";
import CustomTooltip from "./CustomTooltip";

export interface ChainChartData {
  id: number;
  name: string;
  value: number;
}

export interface LineChartData {
  date: string;
  values: { [id: number | string]: ChainChartData }
}

export interface LineChartProps {
  chainIds: ChainID[];
  timeFrame: TimeFrame;
  data: LineChartData[];
  xAxisTickFormatter: TickFormatter
  yAxisTickFormatter: TickFormatter
}

const MultiLineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const {data, chainIds, xAxisTickFormatter, yAxisTickFormatter} = props;
  const chains: ChainInfo[] = chainIds.map<ChainInfo>(id => {
    return CHAINS_BY_ID[id as ChainId];
  });
  const labels = chains.map(chain => chain.name);
  const colors = chains.map(chain => COLOR_BY_CHAIN_ID[chain.id]);
  const reChartData = data.reduce<Array<ReChartData>>((acc, multiData) => {
    let obj: ReChartData = {date: multiData.date};
    Object.values(multiData.values).forEach(info => {
      obj[info.name] = info.value;
    });

    return [...acc, obj];
  }, []);

  return <ResponsiveContainer height={452}>
    <LineChart data={reChartData}>
      <XAxis
        dataKey="date"
        tickFormatter={xAxisTickFormatter}
        tick={{fill: "white", fontSize: 12}}
        interval={props.timeFrame.interval}
        axisLine={false}
        tickLine={false}
        padding={{left: 30, right: 30}}
      />
      <YAxis
        tick={{fill: "white", fontSize: 12}}
        tickFormatter={yAxisTickFormatter}
        axisLine={false}
        tickLine={false}
        width={80}
      />
      {/* <Tooltip cursor={false}/> */}
      <Tooltip content={<CustomTooltip title={'TVL'} valueFormatter={props.yAxisTickFormatter} />} />
      <Legend verticalAlign="bottom"/>
      {labels.map((label, index) => (
        <Line
          key={index}
          dataKey={label}
          stroke={colors[index]}
          type="natural"
          legendType="square"
          dot={false}
          activeDot={true}
          strokeWidth={3}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>

}

export default MultiLineChart;
