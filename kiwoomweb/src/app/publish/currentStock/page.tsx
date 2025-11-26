'use client';
import PieChartExample from './pieChart';
import BasicTable from './MuiDataTable';

type Contact = {
    groupName: string;
    currentAmount: number;
    pastAmount: number;
    changeRate: string;
};

const data01: Contact[] = [
    {
        groupName: 'Group A111111111111111111111111111111111111111111111111111111111111111',
        currentAmount: 400,
        pastAmount: 200,
        changeRate: '100%',
    },
    { groupName: 'Group B', currentAmount: 40031, pastAmount: 22400, changeRate: '1010%' },
    { groupName: 'Group C', currentAmount: 4001, pastAmount: 2200, changeRate: '1003%' },
    { groupName: 'Group D', currentAmount: 4020, pastAmount: 21400, changeRate: '1020%' },
    { groupName: 'Group E', currentAmount: 4040, pastAmount: 2010, changeRate: '1300%' },
];
const columnKeys: (keyof Contact)[] = ['groupName', 'currentAmount', 'pastAmount', 'changeRate'];

const COLORS = [
    '#38bdf8', // sky-400
    '#4ade80', // green-400
    '#facc15', // yellow-400
    '#fb7185', // rose-400
    '#c084fc', // purple-400
    '#2dd4bf', // teal-400
    '#818cf8', // indigo-400
    '#fb923c', // orange-400
    '#34d399', // emerald-400
    '#94a3b8', // slate-400
];

const headers = ['그룹명', '현재평가금액', '과거평가금액', '변동률'];

const currentStockPage = () => {
    return (
        <div>
            <div>현재 보유 현황</div>
            <PieChartExample data={data01} />
            <div className="overflow-x-auto snap-x snap-mandatory text-xs">
                {/* <MyGrid contacts={data01} /> */}
                <BasicTable
                    header={headers}
                    rows={data01}
                    columnKeys={columnKeys}
                    columnIdKey={columnKeys[0]}
                />
            </div>
        </div>
    );
};

export default currentStockPage;
