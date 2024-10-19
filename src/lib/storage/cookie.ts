import Cookies from "js-cookie";
import { cookies as NextCookies } from "next/headers";

const EXPIRES_IN_DAYS = 30;
const EXPIRES_IN = 60 * 60 * 24 * 1000 * EXPIRES_IN_DAYS;

export interface CookieStorage<T> {
  get: () => T | undefined;
  has: () => boolean;
  set: (value: T) => void;
  remove: () => void;
}

export class CookieClientStorage<T> implements CookieStorage<T> {
  constructor(private name: string) {}

  get() {
    const value = Cookies.get(this.name);
    if (value === undefined) return undefined;
    return JSON.parse(value) as T;
  }

  has() {
    return Cookies.get(this.name) !== undefined;
  }

  set(value: T) {
    Cookies.set(this.name, JSON.stringify(value), {
      sameSite: "Strict",
      expires: EXPIRES_IN_DAYS,
    });
  }

  remove() {
    Cookies.remove(this.name);
  }
}

export class CookieServerStorage<T> implements CookieStorage<T> {
  constructor(
    private name: string,
    private cookies: ReturnType<typeof NextCookies>
  ) {}

  get() {
    const value = this.cookies.get(this.name);
    if (value === undefined) return undefined;
    return JSON.parse(value.value) as T;
  }

  has() {
    return this.cookies.has(this.name);
  }

  set(value: T) {
    this.cookies.set(this.name, JSON.stringify(value), {
      sameSite: "strict",
      expires: Date.now() + EXPIRES_IN,
    });
  }

  remove() {
    this.cookies.delete(this.name);
  }
}

export function cookieStorage<T>(name: string) {
  return (cookies?: ReturnType<typeof NextCookies> | undefined) => {
    const handler =
      cookies !== undefined
        ? new CookieServerStorage<T>(name, cookies)
        : new CookieClientStorage<T>(name);
    return handler;
  };
}
