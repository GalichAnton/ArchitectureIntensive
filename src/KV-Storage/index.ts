import KVFactory from "./factory";
import type { KVStorageOptions } from "./interaface";

export {
  KVStorageOptions,
  StorageEngine,
  SerializableValue,
} from "./interaface";

export { default as LocalStorageEngine } from "./engines/localStorage-engine";
export { default as SessionStorageEngine } from "./engines/sessionStorage-engine";

export default function factory(
  namespace: string,
  options: KVStorageOptions
): KVFactory {
  return new KVFactory(namespace, options);
}
