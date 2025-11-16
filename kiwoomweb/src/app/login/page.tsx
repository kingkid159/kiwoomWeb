'use client';

import React, { useEffect, useState } from "react";
import TextField from '@/components/common/TextField'
import { useAuthStore } from "@/store/auth";
import { postRequest } from '@/lib/fetch'

export default function LoginPage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')

  const loginClickHandler = (loginId: string, password: string) => {
    postRequest('/api/login', { loginId, password }).then(({ success, data }) => {
      if (success) {
        setAccessToken(data)
      }
    })
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen">로그인
        <TextField id="loginId" label="아이디" onChangeEvent={(e) => setLoginId(e.target.value)} />
        <TextField id="password" label="비밀번호" onChangeEvent={(e) => setPassword(e.target.value)} />
        <button className="bg-lime-300 rounded-sm py-3 px-6" onClick={() => { loginClickHandler(loginId, password) }}>로그인</button>
        <p>Token: {accessToken}</p>
      </div>
    </div>)
}