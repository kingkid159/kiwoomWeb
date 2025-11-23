'use client'

import { useRouter } from "next/navigation"

const Lnb = () => {

  const router = useRouter();
  const menuClickHandler = (menuUrl: string) => {
    router.push(menuUrl);
  }

  return (<div>
    <ul>
      <li onClick={() => menuClickHandler('/myAccount')}>내 계좌정보</li>
    </ul>
  </div>)
}

export default Lnb;