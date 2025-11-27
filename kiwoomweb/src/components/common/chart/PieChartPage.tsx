'use client';

import React, { useState, useEffect, use } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import COLORS from '@/constants/Colors';

interface Props<T> {
    data: Array<T>;
}

type ChartDataInput = {
    id?: string | number;
    value: number;
    label?: string;
    // 필요하면 더 추가
};

const PieChartPage = <T extends object>({ data }: Props<T>) => (
    <PieChart
        style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
        responsive
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
    >
        <Pie
            data={data as unknown as ChartDataInput[]}
            dataKey="value"
            nameKey="displayName"
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

export default PieChartPage;
