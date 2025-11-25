'use client';

import { useRouter, usePathname } from 'next/navigation'; // App Router
import { useAuthStore } from '@/store/auth';

const PUBLIC_PATHS = ['/login', '/'];

const AuthGuardClient = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  let isReady = false;
  if (PUBLIC_PATHS.includes(pathname)) {
    isReady = true
  }
  if (!accessToken) {
    router.replace('/login');
  } else {
    isReady = true
  }

  // ⭐️ 인증 상태 확인 중이거나 보호된 경로인데 토큰이 없다면 로딩 표시
  if (!isReady) {
    return <div>인증 상태 확인 중...</div>;
  }

  // 준비 완료 시 자식 컴포넌트 렌더링
  return <>{children}</>;
}

export default AuthGuardClient