'use client';

import React, { useState, useEffect, use, useMemo } from 'react';
import { getRequest } from '@/lib/fetch';
import MyAccountStatus, { ChartData, TableData } from '@/type/account/MyAccountStatus';
import PieChartPage from '@/components/common/chart/PieChartPage';
import BasicTable from '../../../components/common/table/BasicTable';
import AccountEntity from '@/type/account/AccountEntity';
import COLORS from '@/constants/Colors';

type Contact = {
    color: string;
    groupName: string;
    currentAmount: string;
    returnRate: string;
    rate: string;
    targetRate: string;
};

const columnKeys: (keyof Contact)[] = [
    'color',
    'groupName',
    'currentAmount',
    'returnRate',
    'rate',
    'targetRate',
];

const headers = ['', '그룹명', '현재금액', '수익률', '비율', '목표비율'];

const MyAccountStatusPage = () => {
    const [chartData, setChartData] = useState<Array<ChartData>>([]);
    const [tableData, setTableData] = useState<Array<TableData>>([]);
    const [myAccount, setMyAccount] = useState<AccountEntity>();
    useEffect(() => {
        getRequest<MyAccountStatus>('/myAccount/getMyGroupState', { date: '20251122' }).then(
            ({ data }) => {
                setMyAccount(data.stockInfo);
                setChartData(data.chartData);
                setTableData(data.tableData);
            }
        );
    }, []);

    const tableGrid = useMemo(() => {
        if (!myAccount) return [];

        return tableData.map((item, index) => ({
            color: COLORS[index],
            groupName: item.groupName,
            currentAmount: item.currentAmount,
            returnRate: item.returnRate,
            rate: item.rate,
            targetRate: item.targetRate,
        }));
    }, [tableData]);

    return (
        <div className="mt-15">
            <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center space-y-4">
                <div className="text-center">
                    <p className="text-gray-900 font-bold text-xl">현재 보유 자산</p>
                    <p className="text-gray-400 text-sm">그룹별 자산 비중 분석</p>
                </div>

                <div className="relative w-[220px] h-[220px] flex items-center justify-center">
                    <PieChartPage data={chartData} />

                    {/* 중앙 표시 */}
                    <div className="absolute text-center">
                        <p className="text-sm font-semibold text-gray-900">
                            {myAccount?.tot_evlt_amt &&
                                Number(myAccount?.tot_evlt_amt).toLocaleString()}
                            원
                        </p>
                        <p className="text-gray-500 text-xs">Total</p>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto snap-x snap-mandatory text-xs">
                {/* <MyGrid contacts={data01} /> */}
                <BasicTable
                    header={headers}
                    rows={tableGrid}
                    columnKeys={columnKeys}
                    columnIdKey={columnKeys[0]}
                />
            </div>
        </div>
    );
};

export default MyAccountStatusPage;
