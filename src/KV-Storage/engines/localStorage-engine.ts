import type { KVStorageEngine } from "./interface";

export default class LocalStorageEngine implements KVStorageEngine {
  get(key: string): ReturnType<KVStorageEngine["get"]> {
    return localStorage.getItem(key);
  }

  remove(key: string): ReturnType<KVStorageEngine["remove"]> {
    localStorage.removeItem(key);
  }

  set(key: string, value: string): ReturnType<KVStorageEngine["set"]> {
    localStorage.setItem(key, value);
  }
}
