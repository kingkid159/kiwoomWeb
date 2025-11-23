export default interface AccountEntity {
  dt: string,
  tot_buy_amt: string,
  tot_evlt_amt: string,
  tot_evltv_prft: string,
  tot_prft_rt: string,
  dbst_bal: string,
  day_stk_asst: string,
  buy_wght: string,
  day_bal_rt: Array<AccountDetail>,
  return_code: number,
  return_msg: string
}

export type AccountDetail = {
  cur_prc: string,
  stk_cd: string,
  stk_nm: string,
  rmnd_qty: string,
  buy_uv: string,
  buy_wght: string,
  evltv_prft: string,
  prft_rt: string,
  evlt_amt: string,
  evlt_wght: string,
}