import ResponseEntity from '@/type/common/ResponseEntity';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

const BASED_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api';

export async function loginRequest<T>(url: string, params: unknown): Promise<ResponseEntity<T>> {
    const res = await fetch(BASED_URL + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(params),
        cache: 'no-store',
    });

    if (res.status === 401 || res.status === 403) {
        refresh();
    }

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Request failed: ${res.status} - ${error}`);
    }

    return res.json();
}

export async function getRequest<T>(url: string, params: unknown): Promise<ResponseEntity<T>> {
    const res = await fetch(BASED_URL + url + `?${await buildQuery(params)}`, {
        method: 'GET',
        headers: await headers(),
        credentials: 'include',
        cache: 'no-store',
    });

    if (res.status === 401 || res.status === 403) {
        refresh();
    }

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Request failed: ${res.status} - ${error}`);
    }

    return res.json();
}

export async function postRequest<T>(url: string, params: unknown): Promise<ResponseEntity<T>> {
    const res = await fetch(BASED_URL + url, {
        method: 'POST',
        headers: await headers(),
        credentials: 'include',
        body: JSON.stringify(params),
        cache: 'no-store',
    });

    if (res.status === 401 || res.status === 403) {
        refresh();
    }

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Request failed: ${res.status} - ${error}`);
    }

    return res.json();
}

export async function deleteRequest<T>(url: string, params: unknown): Promise<ResponseEntity<T>> {
    const res = await fetch(BASED_URL + url + `?${await buildQuery(params)}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: await headers(),
        cache: 'no-store',
    });

    if (res.status === 401 || res.status === 403) {
        refresh();
    }

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Request failed: ${res.status} - ${error}`);
    }

    return res.json();
}

async function headers() {
    const accessToken = useAuthStore.getState().accessToken;
    const headers = { 'Content-Type': 'application/json', Authorization: '' };
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
    return headers;
}

export async function refresh() {
    const res = await fetch(`${BASED_URL}/auth/refreshToken`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!res.ok) {
        redirect('/login');
    }
    const data = await res.json();

    useAuthStore.getState().setAccessToken(data.data);
}

async function buildQuery(
    paramsPromise: Promise<Record<string, unknown>> | unknown
): Promise<string> {
    const params = (await paramsPromise) as Record<string, unknown>;

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
