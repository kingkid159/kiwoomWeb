'use client';

import React, { useState, useEffect, use, useMemo } from 'react';
import { getRequest } from '@/lib/fetch';
import MyAccountStatus, { ChartData } from '@/type/account/MyAccountStatus';
import PieChartPage from '@/components/common/chart/PieChartPage';
import BasicTable from '../../../components/common/table/BasicTable';
import AccountEntity from '@/type/account/AccountEntity';
import COLORS from '@/constants/Colors';

type Contact = {
    color: string | null;
    groupName: string;
    currentAmount: number;
    rate: string | undefined;
};

const columnKeys: (keyof Contact)[] = ['color', 'groupName', 'currentAmount', 'rate'];

const headers = ['', '그룹명', '현재금액', '비율'];

const MyAccountStatusPage = () => {
    const [chartData, setChartData] = useState<Array<ChartData>>([]);
    const [myAccount, setMyAccount] = useState<AccountEntity>();
    useEffect(() => {
        getRequest<MyAccountStatus>('/myAccount/getMyGroupState', { date: '20251122' }).then(
            ({ data }) => {
                setMyAccount(data.stockInfo);
                setChartData(data.chartData);
            }
        );
    }, []);

    const tableData = useMemo(() => {
        if (!myAccount) return [];

        return chartData.map((item, index) => ({
            color: COLORS[index],
            groupName: item.displayName,
            currentAmount: item.value.toLocaleString(),
            rate: ((item.value / Number(myAccount.tot_evlt_amt)) * 100).toFixed(2) + '%',
        }));
    }, [chartData, myAccount]);

    return (
        <div className="mt-15">
            <div>현재 보유 현황</div>
            <PieChartPage data={chartData} />
            <div className="overflow-x-auto snap-x snap-mandatory text-xs">
                {/* <MyGrid contacts={data01} /> */}
                <BasicTable
                    header={headers}
                    rows={tableData}
                    columnKeys={columnKeys}
                    columnIdKey={columnKeys[0]}
                />
            </div>
        </div>
    );
};

export default MyAccountStatusPage;
