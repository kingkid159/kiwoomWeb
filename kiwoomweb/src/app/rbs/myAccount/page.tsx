'use client';

import React, { useState, useEffect, use } from 'react';
import { getRequest } from '@/lib/fetch';
import AccountEntity, { AccountDetail } from '@/type/account/AccountEntity';
import PieChartExample from '@/components/common/chart/pieChart';
import BasicTable from '../../../components/common/table/BasicTable';

const detailData = {
    cur_prc: '',
    stk_cd: '',
    stk_nm: '',
    rmnd_qty: '',
    buy_uv: '',
    buy_wght: '',
    evltv_prft: '',
    prft_rt: '',
    evlt_amt: '',
    evlt_wght: '',
};

const dataa = {
    dt: '',
    tot_buy_amt: '',
    tot_evlt_amt: '',
    tot_evltv_prft: '',
    tot_prft_rt: '',
    dbst_bal: '',
    day_stk_asst: '',
    buy_wght: '',
    day_bal_rt: [],
    return_code: 0,
    return_msg: '',
};

type Contact = {
    groupName: string;
    currentAmount: number;
    pastAmount: number;
    changeRate: string;
};

const data01: Contact[] = [
    {
        groupName: 'Group A111111111111111111111111111111111111111111111111111111111111111',
        currentAmount: 400,
        pastAmount: 200,
        changeRate: '100%',
    },
    { groupName: 'Group B', currentAmount: 40031, pastAmount: 22400, changeRate: '1010%' },
    { groupName: 'Group C', currentAmount: 4001, pastAmount: 2200, changeRate: '1003%' },
    { groupName: 'Group D', currentAmount: 4020, pastAmount: 21400, changeRate: '1020%' },
    { groupName: 'Group E', currentAmount: 4040, pastAmount: 2010, changeRate: '1300%' },
];
const columnKeys: (keyof Contact)[] = ['groupName', 'currentAmount', 'pastAmount', 'changeRate'];

const headers = ['그룹명', '현재평가금액', '과거평가금액', '변동률'];

const currentStockPage = () => {
    const [detailDataList, setDetailDataList] = useState<Array<AccountDetail>>([detailData]);
    const [data, setData] = useState<AccountEntity>(dataa);

    useEffect(() => {
        getRequest<AccountEntity>('/myAccount/getMyGroupState', { date: '20251122' }).then(
            ({ data }) => {
                setData(data);
                setDetailDataList(data.day_bal_rt);
            }
        );
    }, []);
    return (
        <div>
            <div>현재 보유 현황</div>
            <PieChartExample data={data01} />
            <div className="overflow-x-auto snap-x snap-mandatory text-xs">
                {/* <MyGrid contacts={data01} /> */}
                <BasicTable
                    header={headers}
                    rows={data01}
                    columnKeys={columnKeys}
                    columnIdKey={columnKeys[0]}
                />
            </div>
        </div>
    );
};

export default currentStockPage;
