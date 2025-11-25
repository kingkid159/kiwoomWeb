'use client'
import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react'
import { getRequest } from '@/lib/fetch';
import { AccountDetail } from '@/type/account/AccountEntity';

interface Props {
  select: Dispatch<SetStateAction<Array<AccountDetail>>>
  selectedStock: Array<AccountDetail>
}

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

const Sheet2Contents = ({ select, selectedStock }: Props) => {
  const [stockList, setStockList] = useState<Array<AccountDetail>>([detailData])
  const [selectedList, setSelectedList] = useState<Array<AccountDetail>>(selectedStock);

  useEffect(() => {
    getRequest("/account/myStock", { date: '20251122' }).then(({ data }) => { setStockList(data.day_bal_rt) })
  }, [])

  const selected = (isSelect: boolean, selectedData: AccountDetail) => {
    if (isSelect) {
      setSelectedList(prev => [...prev, selectedData]);
    } else {
      setSelectedList(prev => prev.filter(item => item.stk_cd !== selectedData.stk_cd));
    }
  };

  const saveHandler = () => {
    select(selectedList)
  }

  return (
    <div className="h-full overflow-auto p-4">
      <h1 className="text-center text-lg font-semibold pb-4">종목 선택</h1>

      <ul className="divide-y divide-gray-200">
        {stockList.map((item, i) => (
          <li key={item.stk_cd} className="flex items-center justify-between py-3">
            <span className="text-gray-800 font-medium truncate max-w-[200px]">{item.stk_nm}</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 truncate max-w-[100px]">Detail</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#007aff"
                viewBox="0 0 24 24"
                className="w-5 h-5"
                onClick={() => selected(false, item)}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffffff"
                stroke='#7c7c7cff'
                viewBox="0 0 24 24"
                className="w-5 h-5"
                onClick={() => selected(true, item)}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </li>
        ))}
      </ul>

      <button className="w-full mt-8 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition" onClick={() => saveHandler()}>
        저장
      </button>
    </div>
  );
}

export default Sheet2Contents;
