'use client';

import React, { useState, useEffect, use } from 'react';
import { getRequest } from '@/lib/fetch';
import AccountEntity, { AccountDetail } from '@/type/account/AccountEntity';
import { PlusIcon } from '@heroicons/react/16/solid';
import BottomSheet from '@/components/common/BottomSheet/Sheet';
import BottomSheet2 from '@/components/common/BottomSheet/Sheet2';

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

const RebalenceGroupDetail = () => {
    return <div></div>;
};

export default RebalenceGroupDetail;
