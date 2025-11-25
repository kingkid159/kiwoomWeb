'use client'

import React, { useState, useEffect, use } from 'react';
import { getRequest } from '@/lib/fetch';
import AccountEntity, { AccountDetail } from '@/type/account/AccountEntity';
import { PlusIcon } from '@heroicons/react/16/solid';
import BottomSheet from "@/components/common/Sheet"
import BottomSheet2 from "@/components/common/Sheet2"
import Sheet1Contents from './Sheet1Contents';
import Sheet2Contents from './Sheet2Contents';

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
  evlt_wght: ''
}

const RebalenceGroupPage = () => {
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [detailDataList, setDetailDataList] = useState<Array<AccountDetail>>([detailData]);
  const [selectedStock, setSelectedStock] = useState<Array<AccountDetail>>([detailData])
  useEffect(() => {
    if (open || open2) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open, open2]);
  useEffect(() => {
    getRequest("/account/myStock", { date: '20251122' }).then(({ data }) => setDetailDataList(data.day_bal_rt))
  }, [])

  return (
    <div>
      <div className="border m-4 rounded-sm p-4  text-gray-700 flex" onClick={() => setOpen(true)}>
        <PlusIcon className="h-6 w-6" />
        <div>
          그룹 추가
        </div>
      </div>
      <BottomSheet open={open} onClose={() => { setOpen(false) }}><Sheet1Contents openSheet2={() => { setOpen2(true) }} selectedStock={selectedStock} /></BottomSheet>
      <BottomSheet2 open={open2} onClose={() => setOpen2(false)}><Sheet2Contents selectedStock={selectedStock} select={setSelectedStock} /></BottomSheet2>
    </div>)
}

export default RebalenceGroupPage;