import {Bar, BarChart, Legend, ResponsiveContainer,Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import {ChainInfo, CHAINS_BY_ID, COLOR_BY_CHAIN_ID} from "../../../utils/statsConsts";
import {ChainId} from "@certusone/wormhole-sdk";
import {LineChartProps} from "./MultiLineChart";
import {ReChartData} from "../../../types/stats";

const PercentBarChart: React.FC<LineChartProps> = (props: LineChartProps) => {
    const {data, chainIds, yAxisTickFormatter, xAxisTickFormatter} = props;
    const chains: ChainInfo[] = chainIds.map<ChainInfo>(id => {
        return CHAINS_BY_ID[id as ChainId];
    });
    const labels = chains.map(chain => chain.name);
    const colors = chains.map(chain => COLOR_BY_CHAIN_ID[chain.id]);
    const getPercent = (value: number, total: number): number => {
        return parseFloat(((value * 100) / total).toFixed(2));
    };
    const reChartData = data.reduce<Array<ReChartData>>((acc, multiData) => {
        let obj: ReChartData = {date: multiData.date};
        const dayTotal = Object.values(multiData.values).reduce((total, info) => total + info.value, 0);
        Object.values(multiData.values).forEach(info => {
            obj[info.name] = getPercent(info.value, dayTotal);
        });

        return [...acc, obj];
    }, []);

    return <ResponsiveContainer height={452}>
        <BarChart data={reChartData}>
            <XAxis
                dataKey="date"
                tickFormatter={xAxisTickFormatter}
                tick={{fill: "white", fontSize: 12}}
                interval="preserveStartEnd"
                axisLine={false}
                tickLine={false}
            />
            <YAxis
                ticks={[0, 25, 50, 75, 100]}
                tick={{fill: "white", fontSize: 12}}
                tickCount={5}
                tickFormatter={yAxisTickFormatter}
                interval="preserveStartEnd"
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip cursor={false}/>
            <Legend verticalAlign="bottom"/>
            {labels.map((label, index) => (
                <Bar
                    stackId="date"
                    key={index}
                    dataKey={label}
                    fill={colors[index]}
                    legendType="square"
                />
            ))}
        </BarChart>
    </ResponsiveContainer>

}

export default PercentBarChart;