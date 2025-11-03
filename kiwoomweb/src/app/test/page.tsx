'use client';

import React, { useEffect, useState } from "react";
import { connectTest } from '@/src/app/api/test/reoute'

export default function TestPage() {
  const [test, setTest] = useState('')

  useEffect(() => {
    connectTest().then((item) => { setTest(item) })
  }, [])


  return (<div>테스트 화면 : {test}</div>)
}

