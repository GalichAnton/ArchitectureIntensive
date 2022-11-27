export default function factory(
  namespace: string,
  options: StorageOptions
): LSFactory {
  return new LSFactory(namespace, options);
}

type PrimitiveSerializableValue = string | number | boolean | null;

type SerializableValue =
  | PrimitiveSerializableValue
  | PrimitiveSerializableValue[]
  | { [key: string]: PrimitiveSerializableValue }
  | { toJSON(): PrimitiveSerializableValue };

export interface StorageOptions {
  engine: StorageEngine;
}

export type StorageEngine = "local" | "session";

export class LSFactory {
  readonly namespace: string;
  readonly engine: StorageEngine;

  constructor(namespace: string, options?: StorageOptions) {
    this.namespace = namespace;
    this.engine = options?.engine ?? "local";
  }

  async get<T extends SerializableValue>(key: string): Promise<T | null> {
    let rawData;
    const name = this.#getKey(key);
    switch (this.engine) {
      case "local":
        rawData = localStorage.getItem(name);
        break;
      case "session":
        rawData = sessionStorage.getItem(name);
        break;
    }
    return JSON.parse(rawData ?? "null");
  }

  async set(key: string, value: SerializableValue): Promise<void> {
    const data = JSON.stringify(value);
    const name = this.#getKey(key);
    switch (this.engine) {
      case "local":
        localStorage.setItem(name, data);
        break;
      case "session":
        sessionStorage.setItem(name, data);
        break;
    }
  }

  async remove(key: string): Promise<void> {
    const name = this.#getKey(key);
    switch (this.engine) {
      case "local":
        localStorage.removeItem(name);
        break;
      case "session":
        sessionStorage.removeItem(name);
        break;
    }
  }

  #getKey(key: string): string {
    return `[${this.namespace}] - ${key}`;
  }
}
