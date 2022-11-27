export default function factory(namespace: string): LSFactory {
  return new LSFactory(namespace);
}

export class LSFactory {
  readonly namespace: string;
  constructor(namespace: string) {
    this.namespace = namespace;
  }

  get(key: string): string | null {
    return localStorage.getItem(this.#getKey(key));
  }

  set(key: string, value: string): void {
    localStorage.setItem(this.#getKey(key), value);
  }

  remove(key: string) {
    localStorage.removeItem(this.#getKey(key));
  }

  #getKey(key: string): string {
    return `[${this.namespace}] - ${key}`;
  }
}
