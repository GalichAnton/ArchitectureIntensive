class EventEmitter {
  on(event: string, cb: Function) {}

  once(event: string, cb: Function) {}

  off(event?: string, cb?: Function) {}

  emit(event: string, data: unknown) {}
}

interface Visitor {
  new (component: Widget, params: Record<string, Function>): void;
}

class Widget extends EventEmitter {
  constructor(
    visitors: [Visitor: Visitor, params: Record<string, Function>][]
  ) {
    super();

    for (const [Visitor, params] of visitors) {
      new Visitor(this, params);
    }
  }

  render() {
    return "Widget";
  }

  mount() {
    return "Widget mounted";
  }
}

class Button extends Widget {}

class Analytics {
  constructor(component: Widget, events: Record<string, Function> = {}) {
    for (const [event, handler] of Object.entries(events)) {
      component.on(event, handler);
    }
  }
}

const btn = new Button([
  [Analytics, { click: () => reackGoal("click") }],
  [Logging],
]);
