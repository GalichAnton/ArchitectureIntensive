export { KVStorageEngine } from "./engines";
import type { KVStorageEngine } from "./engines";

export interface KVStorageOptions {
  engine: KVStorageEngine;
}

export type StorageEngine = "local" | "session";

export type SerializableValue =
  | PrimitiveSerializableValue
  | PrimitiveSerializableValue[]
  | { [key: string]: PrimitiveSerializableValue }
  | { toJSON(): PrimitiveSerializableValue };

export type PrimitiveSerializableValue = string | number | boolean | null;
