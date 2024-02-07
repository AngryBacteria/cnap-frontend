export enum StorageKeys {
  LATEST_PATCH = 'latestPatch',
  CHAMPIONS = 'champions',
  ITEMS = 'items',
}

export function saveStringToLocal(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function readStringFromLocal(key: string): string | null {
  return localStorage.getItem(key);
}

export function saveObjectToLocal<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function readObjectFromLocal<T>(key: string): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export function saveStringToSession(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

export function readStringFromSession(key: string): string | null {
  return sessionStorage.getItem(key);
}

export function saveObjectToSession<T>(key: string, value: T): void {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function readObjectFromSession<T>(key: string): T | null {
  const item = sessionStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}
