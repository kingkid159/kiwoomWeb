'use client'

import { useRouter } from "next/navigation"
import { useActiveMenuStore } from "@/store/ActiveMenu";

const Lnb = () => {
  const { setMenuName } = useActiveMenuStore();

  const router = useRouter();
  const menuClickHandler = (menuUrl: string, menuName: string) => {
    router.push(menuUrl);
    setMenuName(menuName);
  }

  return (
    <ul>
      <li onClick={() => menuClickHandler('/rbs/myAccount', '내 계좌정보')}>내 계좌정보</li>
      <li onClick={() => menuClickHandler('/rbs/rebalanceGroup', '리벨런싱 그룹 설정')}>리벨런싱 그룹 설정</li>
    </ul>
  )
}

export default Lnb;