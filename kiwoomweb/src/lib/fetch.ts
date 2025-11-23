import ResponseEntity from '@/type/common/ResponseEntity';
import { redirect } from 'next/navigation'

const BASED_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api';

export async function loginRequest<T>(url: string, params: any): Promise<ResponseEntity<T>> {
  const res = await fetch(BASED_URL + url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(params),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  if (res.status === 401) {
    redirect('/login')
  }
  return res.json();
}

export async function getRequest<T>(url: string, params: any): Promise<ResponseEntity> {
  const header = await headers()
  const res = await fetch(BASED_URL + url + `?${await buildQuery(params)}`, {
    method: 'GET',
    headers: header,
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  if (res.status === 401) {
    redirect('/login')
  }

  return res.json();
}

export async function postRequest<T>(url: string, params: any): Promise<ResponseEntity<T>> {
  const header = await headers()
  const res = await fetch(BASED_URL + url, {
    method: 'POST',
    headers: header,
    credentials: "include",
    body: JSON.stringify(params),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  if (res.status === 401) {
    redirect('/login')
  }
  return res.json();
}

export async function deleteRequest<T>(url: string, params: any): Promise<ResponseEntity<T>> {
  const res = await fetch(BASED_URL + url + `?${await buildQuery(params)}`, {
    method: 'DELETE',
    credentials: "include",
    headers: await headers(),
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  if (res.status === 401) {
    redirect('/login')
  }
  return res.json();
}

async function headers() {
  const accessToken = await getAccessToken();
  const headers = { "Content-Type": "application/json", "Authorization": "" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  return headers
}

async function getAccessToken() {
  const res = await fetch(`${BASED_URL}/auth/accessToken`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    redirect('/login')
  }
  const data = await res.json();

  return data.data;
}


async function buildQuery(paramsPromise: Promise<Record<string, any>>): Promise<string> {
  const params = await paramsPromise;

  const query = new URLSearchParams();
  if (!params) {
    return '';
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  return query.toString();
}

// async function refreshToken() {
//   const res = await fetch(`${BASED_URL}/api/auth/refreshToken`, {
//     method: "POST",
//     credentials: "include",
//   });

//   if (!res.ok) {
//     useAuthStore.getState().logout();
//     redirect('/login')
//   }

//   const data = await res.json();
//   useAuthStore.getState().setAccessToken(data.accessToken);
// }
