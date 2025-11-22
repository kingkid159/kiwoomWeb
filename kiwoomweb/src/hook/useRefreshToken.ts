// hooks/useRefreshToken.ts
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

const BASED_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useRefreshToken() {
  const router = useRouter();

  return async function refreshToken() {
    const res = await fetch(`${BASED_URL}/api/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      useAuthStore.getState().logout();
      router.push("/login");
      return null;
    }

    const data = await res.json();
    useAuthStore.getState().setAccessToken(data.data);
    return data.data;
  };
}
