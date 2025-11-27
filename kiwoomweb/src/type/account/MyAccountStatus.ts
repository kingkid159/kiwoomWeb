import AccountEntity from "./AccountEntity";

export default interface MyAccountStatus {
  stockInfo: AccountEntity
  chartData: Array<ChartData>
}

export type ChartData = {
  displayName: string;
  value: number
}