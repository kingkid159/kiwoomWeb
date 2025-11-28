import AccountEntity from './AccountEntity';

export default interface MyAccountStatus {
    stockInfo: AccountEntity;
    chartData: Array<ChartData>;
    tableData: Array<TableData>;
}

export type ChartData = {
    displayName: string;
    value: number;
};

export type TableData = {
    groupName: string;
    currentAmount: string;
    returnRate: string;
    targetRate: number;
    rate: string;
};
