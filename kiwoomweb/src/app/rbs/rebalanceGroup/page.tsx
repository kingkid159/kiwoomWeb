'use client';

import React, { useState, useEffect, use } from 'react';
import { getRequest } from '@/lib/fetch';
import AccountEntity, { AccountDetail } from '@/type/account/AccountEntity';
import BottomSheet from '@/components/common/Sheet';
import BottomSheet2 from '@/components/common/Sheet2';
import Sheet1Contents from './Sheet1Contents';
import Sheet2Contents from './Sheet2Contents';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';

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

const RebalenceGroupPage = () => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [detailDataList, setDetailDataList] = useState<Array<AccountDetail>>([detailData]);
    const [selectedStock, setSelectedStock] = useState<Array<AccountDetail>>([]);
    useEffect(() => {
        if (open || open2) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [open, open2]);
    useEffect(() => {
        getRequest<AccountEntity>('/account/myStock', { date: '20251122' }).then(({ data }) =>
            setDetailDataList(data.day_bal_rt)
        );
    }, []);

    return (
        <div>
            {/* 헤더 영역 */}
            <div className="flex justify-end bg-white fixed top-14 left-0 w-full z-30 ">
                <div className="flex border mx-4 my-2 rounded-3xl p-2 text-gray-700 bg-sky-50 w-auto border-gray-300" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-4.5 w-4.5 fill-sky-500 mr-1" />
                    <span className="text-sm text-gray-500">추가</span>
                </div>
            </div>
            <div className="mt-28">
                <div className="flex justify-between items-center border border-gray-300 m-4 rounded-2xl py-4 text-gray-700">
                    <span className="text-gray-500 truncate flex-1 ml-4">
                        1그룹11111111111111111111111111111111
                    </span>
                    <XCircleIcon className="h-4.5 w-4.5 fill-rose-400 mr-4" />
                </div>
                <div className="flex justify-between items-center border border-gray-300 m-4 rounded-2xl py-4 text-gray-700">
                    <span className="text-gray-500 truncate flex-1 ml-4">
                        1그룹11111111111111111111111111111111
                    </span>
                    <XCircleIcon className="h-4.5 w-4.5 fill-rose-400 mr-4" />
                </div>
                <div className="flex justify-between items-center border border-gray-300 m-4 rounded-2xl py-4 text-gray-700">
                    <span className="text-gray-500 truncate flex-1 ml-4">
                        1그룹11111111111111111111111111111111
                    </span>
                    <XCircleIcon className="h-4.5 w-4.5 fill-rose-400 mr-4" />
                </div>
                <div className="flex justify-between items-center border border-gray-300 m-4 rounded-2xl py-4 text-gray-700">
                    <span className="text-gray-500 truncate flex-1 ml-4">
                        1그룹11111111111111111111111111111111
                    </span>
                    <XCircleIcon className="h-4.5 w-4.5 fill-rose-400 mr-4" />
                </div>
                <div className="flex justify-between items-center border border-gray-300 m-4 rounded-2xl py-4 text-gray-700">
                    <span className="text-gray-500 truncate flex-1 ml-4">
                        1그룹11111111111111111111111111111111
                    </span>
                    <XCircleIcon className="h-4.5 w-4.5 fill-rose-400 mr-4" />
                </div>
                <div className="flex justify-between items-center border border-gray-300 m-4 rounded-2xl py-4 text-gray-700">
                    <span className="text-gray-500 truncate flex-1 ml-4">
                        1그룹11111111111111111111111111111111
                    </span>
                    <XCircleIcon className="h-4.5 w-4.5 fill-rose-400 mr-4" />
                </div>
                <div className="flex justify-between items-center border border-gray-300 m-4 rounded-2xl py-4 text-gray-700">
                    <span className="text-gray-500 truncate flex-1 ml-4">
                        1그룹11111111111111111111111111111111
                    </span>
                    <XCircleIcon className="h-4.5 w-4.5 fill-rose-400 mr-4" />
                </div>
            </div>
            <BottomSheet
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <Sheet1Contents
                    openSheet2={() => {
                        setOpen2(true);
                    }}
                    selectedStock={selectedStock}
                    onClose={(e) => setOpen(e)}
                />
            </BottomSheet>
            <BottomSheet2 open={open2} onClose={() => setOpen2(false)}>
                <Sheet2Contents selectedStock={selectedStock} select={setSelectedStock} onClose={(e) => setOpen2(e)} />
            </BottomSheet2>
        </div>
    );
};

export default RebalenceGroupPage;
