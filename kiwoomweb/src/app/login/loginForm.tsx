'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@/components/common/TextField';
import { loginRequest, postRequest, getRequest } from '@/lib/fetch';
import { useAuthStore } from '@/store/auth';

export default function LoginForm() {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const loginClickHandler = (loginId: string, password: string) => {
        loginRequest('/auth/login', { loginId, password }).then(({ success, data }) => {
            if (success) {
                useAuthStore.getState().setAccessToken(data as string);
                postRequest('/oauth/getToken', { loginId, password }).then(({ success, data }) => {
                    if (success) {
                        router.push('/rbs/myAccount');
                    }
                });
            }
        });
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            로그인
            <TextField
                id="loginId"
                label="아이디"
                onChangeEvent={(e) => setLoginId(e.target.value)}
            />
            <TextField
                id="password"
                label="비밀번호"
                onChangeEvent={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-lime-300 rounded-sm py-3 px-6"
                onClick={() => {
                    loginClickHandler(loginId, password);
                }}
            >
                로그인
            </button>
        </div>
    );
}
