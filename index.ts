class Messager<T> {
  private readonly callbacks = new Set<(value: T) => void>()

  dispatch(value: T) {
    this.callbacks.forEach(callback => callback(value))
  }

  subscribe(next: (value: T) => void) {
    this.callbacks.add(next)

    return {
      unsubscribe: () => this.callbacks.delete(next)
    }
  }
}

export namespace ClosureSignal {
  export class State<T> {
    private readonly messager = new Messager<T>()
  
    private value: T
    constructor(initialValue: T) { this.value = initialValue }
  
    set(newValue: T) {
      this.value = newValue
      this.messager.dispatch(newValue)
    }
    get(): T { return this.value }
  
    subscribe(next: (value: T) => void) {
      return this.messager.subscribe(next)
    }
  }
  export class Computed<T> {
    private readonly state: State<T>

    constructor(factory: () => T, dependecies: State<any>[]) {
      this.state = new State(factory())

      dependecies.forEach(dependecy => {
        dependecy.subscribe(() => this.state.set(factory()))
      })
    }

    get(): T { return this.state.get() }
    subscribe(next: (value: T) => void) {
      return this.state.subscribe(next)
    }
  }
}
