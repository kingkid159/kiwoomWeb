'use client';

import React, { useState, useEffect, use } from 'react';
import { getRequest } from '@/lib/fetch';
import AccountEntity, { AccountDetail } from '@/type/account/AccountEntity';

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

const MainPage = () => {
    const [detailDataList, setDetailDataList] = useState<Array<AccountDetail>>([detailData]);
    const [data, setData] = useState<AccountEntity>(dataa);

    useEffect(() => {
        getRequest<AccountEntity>('/account/myStock', { date: '20251122' }).then(({ data }) => {
            setData(data);
            setDetailDataList(data.day_bal_rt);
        });
    }, []);

    return (
        <div>
            <ul>
                <li>일자:{data.dt}</li>
                <li>총 매입가:{data.tot_buy_amt}</li>
                <li>총 평가금액:{data.tot_evlt_amt}</li>
                <li>총 평가손익:{data.tot_evltv_prft}</li>
                <li>수익률:{data.tot_prft_rt}</li>
                <li>예수금:{data.dbst_bal}</li>
                <li>추정자산:{data.day_stk_asst}</li>
                <li>현금비중:{data.buy_wght}</li>
                {detailDataList.map((item) => {
                    return <li key={item.stk_cd}>종목명:{item.stk_nm}</li>;
                })}
            </ul>
        </div>
    );
};

export default MainPage;
