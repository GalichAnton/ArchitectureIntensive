import kvFactory, { SessionStorageEngine } from "./KV-Storage";

const ls = kvFactory("user", { engine: new SessionStorageEngine() });

console.log(ls.get("name"));
ls.set("name", "John");
