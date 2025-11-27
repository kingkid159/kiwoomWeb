'use client';
import { AccountDetail } from '@/type/account/AccountEntity';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { deleteRequest, postRequest } from '@/lib/fetch';
import RebalanceGroup from '@/type/rebalanceGroup/RebalanceGroup';

interface Props {
    openSheet2: () => void;
    selectedStock: Array<AccountDetail>;
    onClose: Dispatch<SetStateAction<boolean>>;
    groupData: RebalanceGroup | null;
}

const Sheet1Contents = ({ openSheet2, selectedStock, onClose, groupData }: Props) => {
    const [params, setParams] = useState(() => ({
        id: groupData?.id ?? '',
        groupName: groupData?.groupName ?? '',
        groupDesc: groupData?.groupDesc ?? '',
        stockInfos: [] as AccountDetail[],
    }));

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveHandler = () => {
        setParams((prev) => {
            const updated = { ...prev, stockInfos: selectedStock };
            postRequest('/rebalance/saveGroup', updated).then(({ success }) => {
                if (success) {
                    onClose(false);
                }
            });
            return updated;
        });
    };

    const deleteHandler = () => {
        deleteRequest('/rebalance/deleteGroup', { groupId: groupData!.id }).then(({ success }) => {
            if (success) {
                onClose(false);
            }
        });
    };

    return (
        <div className="w-full h-full overflow-auto justify-center">
            <div className="text-center text-lg font-semibold pb-4 text-gray-500">그룹설정</div>

            <div className="px-6 space-y-6">
                <div>
                    <label className="text-gray-400 text-sm">그룹명</label>
                    <input
                        type="text"
                        className="w-full border-b border-gray-200 focus:outline-none py-2 text-gray-600"
                        name="groupName"
                        onChange={handleInput}
                        value={params?.groupName}
                    />
                </div>

                <div>
                    <label className="text-gray-400 text-sm">그룹설명</label>
                    <textarea
                        name="groupDesc"
                        className="w-full border-b border-gray-200 focus:outline-none py-2 resize-none text-gray-600"
                        onChange={handleTextarea}
                        value={params?.groupDesc}
                    />
                </div>

                <div
                    className="flex items-center justify-between py-3 border-b border-gray-200"
                    onClick={openSheet2}
                >
                    <span className="text-gray-500 font-medium ">종목 선택</span>
                    <span className="text-gray-400">{'>'}</span>
                </div>
            </div>
            <div className="px-6">
                {selectedStock.map((item) => (
                    <div
                        key={item.stk_cd}
                        className="truncate w-[200px] text-gray-60 text-xs py-0.5"
                    >
                        {item.stk_nm}
                    </div>
                ))}
            </div>
            <div className="w-full py-8 flex justify-around">
                <button className="text-sky-500 font-semibold" onClick={() => saveHandler()}>
                    저장
                </button>
                {groupData && (
                    <button className="text-rose-500 font-semibold" onClick={() => deleteHandler()}>
                        삭제
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sheet1Contents;
