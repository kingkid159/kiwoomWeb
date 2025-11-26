'use client';

import React, { useState, useEffect, use } from 'react';
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
    return (
        <div>
            {/* 헤더 영역 */}
            <div className="flex justify-end bg-white fixed top-0 left-0 w-full z-50 ">
                <div className="flex border mx-4 my-2 rounded-3xl p-2 text-gray-700 bg-sky-50 w-auto border-gray-300">
                    <PlusCircleIcon className="h-4.5 w-4.5 fill-sky-500 mr-1" />
                    <span className="text-sm text-gray-500">추가</span>
                </div>
            </div>

            <div className="mt-14">
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
        </div>
    );
};

export default RebalenceGroupPage;
