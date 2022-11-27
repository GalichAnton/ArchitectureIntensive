import DefaultEngine from "./engines";
import {
  KVStorageEngine,
  KVStorageOptions,
  SerializableValue,
} from "./interaface";

export default class KVFactory {
  readonly namespace: string;
  readonly #engine: KVStorageEngine;

  constructor(namespace: string, options?: KVStorageOptions) {
    this.namespace = namespace;
    this.#engine = options?.engine ?? new DefaultEngine();
  }

  async get<T extends SerializableValue>(key: string): Promise<T | null> {
    const rawData = await this.#engine.get(this.#getKey(key));
    return JSON.parse(rawData ?? "null");
  }

  async set(key: string, value: SerializableValue): Promise<void> {
    const data = JSON.stringify(value);
    await this.#engine.set(this.#getKey(key), data);
  }

  async remove(key: string): Promise<void> {
    await this.#engine.remove(this.#getKey(key));
  }

  #getKey(key: string): string {
    return `[${this.namespace}] - ${key}`;
  }
}
