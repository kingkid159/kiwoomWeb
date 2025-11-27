export default interface RebalanceGroup {
    id: number;
    groupName: string;
    groupDesc: string;
    userId: number;
    insertTime: Date;
    updateTime: Date;
    stocks: Array<RebalanceGroupStock>;
}

export type RebalanceGroupStock = {
    id: number;
    groupId: number;
    userId: number;
    stockCode: string;
    stockName: string;
};
