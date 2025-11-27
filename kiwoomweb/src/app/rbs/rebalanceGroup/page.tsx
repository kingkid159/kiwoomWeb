'use client';

import React, { useState, useEffect, use } from 'react';
import { getRequest } from '@/lib/fetch';
import BottomSheet from '@/components/common/BottomSheet/Sheet';
import BottomSheet2 from '@/components/common/BottomSheet/Sheet2';
import Sheet1Contents from './Sheet1Contents';
import Sheet2Contents from './Sheet2Contents';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import RebalanceGroup from '@/type/rebalanceGroup/RebalanceGroup';
import { AccountDetail } from '@/type/account/AccountEntity';

const detailData = {
    id: 0,
    groupName: '',
    groupDesc: '',
    userId: 0,
    insertTime: new Date(),
    updateTime: new Date(),
    stocks: [],
};

const accountDetailInit = {
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
    const [stockGroupList, setStockGroupList] = useState<Array<RebalanceGroup>>([detailData]);
    const [groupData, setGroupData] = useState<RebalanceGroup | null>(null);
    const [selectedStock, setSelectedStock] = useState<Array<AccountDetail>>([]);
    useEffect(() => {
        if (open || open2) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [open, open2]);
    useEffect(() => {
        if (!open) {
            getRequest<Array<RebalanceGroup>>('/rebalance/getGroupList', {}).then(({ data }) => {
                setStockGroupList(data);
                setGroupData(null);
                setSelectedStock([]);
            });
        }
    }, [open]);

    const groupClickHandler = (data: RebalanceGroup) => {
        setGroupData(data);
        const stockArray: Array<AccountDetail> = [];
        data.stocks.forEach((item) => {
            const accountDetail = { ...accountDetailInit };
            accountDetail['stk_nm'] = item.stockName;
            accountDetail['stk_cd'] = item.stockCode;
            stockArray.push(accountDetail);
        });
        setSelectedStock(stockArray);
        setOpen(true);
    };

    return (
        <div>
            {/* 헤더 영역 */}
            <div className="flex justify-end bg-white fixed top-14 left-0 w-full z-30 ">
                <div
                    className="flex border mx-4 my-2 rounded-3xl p-2 text-gray-700 bg-sky-50 w-auto border-gray-300 shadow-sm "
                    onClick={() => setOpen(true)}
                >
                    <PlusCircleIcon className="h-4.5 w-4.5 fill-sky-500 mr-1" />
                    <span className="text-sm text-gray-500">추가</span>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-28">
                {stockGroupList.map((item) => (
                    <div
                        className="flex justify-between items-center border border-gray-300 rounded-2xl py-4 px-4 text-gray-700 bg-neutral-50 shadow-sm hover:shadow-md transition-shadow duration-300"
                        onClick={() => groupClickHandler(item)}
                        key={item.id}
                    >
                        <span className="text-gray-500 truncate flex-1">{item.groupName}</span>
                    </div>
                ))}
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
                    groupData={groupData}
                />
            </BottomSheet>
            <BottomSheet2 open={open2} onClose={() => setOpen2(false)}>
                <Sheet2Contents
                    selectedStock={selectedStock}
                    select={setSelectedStock}
                    onClose={(e) => setOpen2(e)}
                    groupData={groupData}
                />
            </BottomSheet2>
        </div>
    );
};

export default RebalenceGroupPage;
