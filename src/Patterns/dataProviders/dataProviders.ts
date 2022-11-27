import { DataProvider } from "./interface";

const cash = new Map();

export default class BaseProvider<T> implements DataProvider<T> {
  constructor() {
    if (cash.has(this.constructor.name)) {
      return cash.get(this.constructor.name);
    }
    cash.set(this.constructor.name, this);
  }
}

class Widget {
  constructor() {}

  render() {
    return "Widget";
  }

  mount() {
    return "Widget mounted";
  }
}

class Button extends Widget {
  provider?: DataProvider<any>;
  convertData?: Function;
  constructor(params: {
    provider?: typeof DataProvider<any>;
    convertData?: Function;
  }) {
    super();
    if (params.provider) {
      this.provider = new params.provider();
    }
    this.convertData = params.convertData;
  }
}

const button = new Button({
  provider: BaseProvider,
  convertData: (data: any) => data,
});
