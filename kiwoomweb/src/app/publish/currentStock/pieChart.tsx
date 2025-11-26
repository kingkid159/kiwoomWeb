'use client';

import React, { useState, useEffect, use } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

interface Props<T> {
    data: Array<T>;
}

type ChartDataInput = {
    id?: string | number;
    value: number;
    label?: string;
    // 필요하면 더 추가
};

const COLORS = [
    '#38bdf8', // sky-400
    '#4ade80', // green-400
    '#facc15', // yellow-400
    '#fb7185', // rose-400
    '#c084fc', // purple-400
    '#2dd4bf', // teal-400
    '#818cf8', // indigo-400
    '#fb923c', // orange-400
    '#34d399', // emerald-400
    '#94a3b8', // slate-400
];

const PieChartExample = <T extends Object>({ data }: Props<T>) => (
    <PieChart
        style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
        responsive
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
    >
        <Pie
            data={data as unknown as ChartDataInput[]}
            dataKey="currentAmount"
            nameKey="groupName"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#82ca9d"
            legendType="rect"
            isAnimationActive={true}
        >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
    </PieChart>
);

export default PieChartExample;
