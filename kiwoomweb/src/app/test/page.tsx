'use client';

import React, { useEffect, useState } from "react";
import { connectTest, connectDbTest } from '@/src/app/api/test/reoute'

export default function TestPage() {
  const [test, setTest] = useState('')
  const [dbTest, setDbTest] = useState('')
  useEffect(() => {
    // connectTest().then((item) => { setTest(item) })
    connectDbTest().then((item) => { setDbTest(item) })
  }, [])


  return (<div>테스트 화면 : {test} db : {dbTest}</div>)
}

