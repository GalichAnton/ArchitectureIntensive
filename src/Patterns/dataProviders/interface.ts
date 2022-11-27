export interface DataProvider<T> {
  getData(query: string): Promise<T>;
  addData<T>(data: object, query: string): Promise<T>;
  updData<T>(data: object, query: string): Promise<T>;
  deleteData<T>(query: string): Promise<T>;
}
