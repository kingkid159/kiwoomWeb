'use client'

import React,{useState}from "react"
import BottomSheet from "@/components/common/Sheet"
import BottomSheet2 from "@/components/common/Sheet2"

const Contents = ({ openSheet2 }: { openSheet2: () => void }) => {
    return(<div className="h-full overflow-auto p-4">
        <div className="text-center text-lg font-semibold pb-4">
          그룹설정
        </div>

        <div className="px-6 space-y-6">
          <div>
            <label className="text-gray-400 text-sm">그룹명</label>
            <input
              type="text"
              className="w-full border-b border-gray-200 focus:outline-none py-2"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm">그룹설명</label>
            <textarea
              className="w-full border-b border-gray-200 focus:outline-none py-2 resize-none"
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-200" onClick={openSheet2}>
            <span className="text-gray-900 font-medium">종목 선택</span>
            <span className="text-gray-400">{">"}</span>
          </div>
        </div>

        <div className="w-full py-8 flex justify-center">
          <button className="text-blue-600 font-semibold">저장</button>
        </div>
        </div>)
}

const MainPage = ()=>{

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        바텀시트 열기
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)}> <Contents openSheet2={() => setOpen2(true)} /></BottomSheet>
      <BottomSheet2 open={open2} onClose={() => setOpen2(false)}><div>hi</div></BottomSheet2>
    </div>)
}

export default MainPage;