import ResponseEntity from '@/type/common/ResponseEntity';
// import { FormInstance } from 'antd';
// import _ from 'lodash';

const BASED_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getRequest<T>(url: string, params: any): Promise<ResponseEntity> {
  const res = await fetch(BASED_URL + url + `?${await buildQuery(params)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  return res.json();
}

export async function postRequest<T>(url: string, params: any): Promise<ResponseEntity<T>> {
  const res = await fetch(BASED_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  return res.json();
}

export async function deleteRequest<T>(url: string, params: any): Promise<ResponseEntity<T>> {
  const res = await fetch(BASED_URL + url + `?${await buildQuery(params)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  return res.json();
}

export async function putRequestFileUpload<T>(
  uploadUrl: '/api/upload-image' | '/api/upload-file',
  params: any,
  url?: string
): Promise<ResponseEntity<T>> {
  const formData = new FormData();
  for (const key in params) {
    if (key === 'files') {
      params[key].forEach((file: File) => {
        formData.append(key, file);
      });
    } else if (key === 'deleteFiles') {
      params[key].forEach((item: any) => {
        formData.append(key, JSON.stringify(item));
      });
    } else {
      formData.append(key, params[key]);
    }
  }

  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  const result = res.json();
  await result.then((result) => {
    formData.delete('files');
    result.data.forEach((item: any) => {
      const json = JSON.stringify(item);
      formData.append('files', json);
    });
  });

  if (url) {
    await fetch(BASED_URL + url, {
      method: 'PUT',
      body: formData,
    });
  }

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  return result;
}

export async function postRequestFileUpload<T>(
  uploadUrl: '/api/upload-image' | '/api/upload-file',
  params: any,
  url?: string
): Promise<ResponseEntity<T>> {
  const formData = new FormData();
  for (const key in params) {
    if (key === 'files') {
      params[key].forEach((file: File) => {
        formData.append('files', file);
      });
    } else {
      formData.append(key, params[key]);
    }
  }
  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  const result = res.json();
  await result.then((result) => {
    formData.delete('files');
    result.data.forEach((item: any) => {
      const json = JSON.stringify(item);
      formData.append('files', json);
    });
  });

  if (url) {
    await fetch(BASED_URL + url, {
      method: 'POST',
      body: formData,
    });
  }

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Request failed: ${res.status} - ${error}`);
  }

  return result;
}

// /** 이메일 보내기 */
// export async function postSendEmail(formData: FormInstance<any>, token: string | null) {
//     const res = await fetch('/api/common/send-mail', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...formData, token }),
//     });
// }

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
