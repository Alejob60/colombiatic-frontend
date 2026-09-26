// src/lib/cookies.ts
import { serialize, parse } from 'cookie';

export const setCookie = (name: string, value: string, options: any = {}) => {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  
  if (typeof options.maxAge === 'number') {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }
  
  return serialize(name, stringValue, options);
};

export const getCookie = (name: string, cookieHeader: string | undefined) => {
  if (!cookieHeader) return undefined;
  
  const cookies = parse(cookieHeader);
  const cookie = cookies[name];
  
  if (!cookie) return undefined;
  
  try {
    return JSON.parse(cookie);
  } catch (e) {
    return cookie;
  }
};

export const deleteCookie = (name: string, options: any = {}) => {
  return serialize(name, '', { ...options, maxAge: -1 });
};