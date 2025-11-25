import { AccountDetail } from "@/type/account/AccountEntity";

interface Props {
  openSheet2: () => void;
  selectedStock: Array<AccountDetail>;
};

const Sheet1Contents = ({ openSheet2, selectedStock }: Props) => {
  return (<div className="h-full overflow-auto p-4">
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
    <div className="px-6">{selectedStock.map((item) => (<div key={item.stk_cd} className="truncate w-[200px]">{item.stk_nm}</div>))}</div>
    <div className="w-full py-8 flex justify-center">
      <button className="text-blue-600 font-semibold">저장</button>
    </div>
  </div>)
}

export default Sheet1Contents;