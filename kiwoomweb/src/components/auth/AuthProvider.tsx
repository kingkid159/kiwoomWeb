'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { refresh } from '@/lib/fetch';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { setAccessToken } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    async function initializeAuth() {
      try {
        await refresh();
      } catch (error) {
        console.error("Failed to refresh token:", error);
      } finally {
        setIsInitialized(true);
      }
    }

    if (!useAuthStore.getState().accessToken) {
      initializeAuth();
    } else {
      setIsInitialized(true);
    }

  }, [setAccessToken]);

  if (!isInitialized) {
    return <div>인증 상태 확인 중...</div>;
  }

  return <>{children}</>;
}