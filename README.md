# Signal (Event-based)
Very small, basically Fundamental Signal Implementation NOT compliant with [tc39 Signals proposal](https://github.com/tc39/proposal-signals) since it uses events to notify subscribers rather than closures, but looks similar.

## Explanation

This is a kind of signal that provides `get` method - retrieves current value, `set` method - updates current and invokes registered callbacks (sometimes said as "notifies subscribers"), `subscribe` method - registers a callback (that will be invoked when current value is changed).

Event-based Signal can be interpreted as **Excplicit** comparing to [Closure-based Signal](https://github.com/FrameMuse/closure-signal).

## Example

```ts
console.log("1. Create")
const firstName = new ClosureSignal.State("John")
const lastName = new ClosureSignal.State("Smith")
const showFullName = new ClosureSignal.State(true)

const displayName = new ClosureSignal.Computed(
  () => showFullName.get() ? `${firstName.get()} ${lastName.get()}` : firstName.get(),
  [showFullName, firstName, lastName, firstName]
)

new ClosureSignal.Computed(() => console.log("My name is", displayName.get()), [displayName])

console.log("2. Set showFullName: false ")
showFullName.set(false)

console.log("3. Change lastName")
lastName.set("Legend")

console.log("4. Set showFullName: true")
showFullName.set(true)

console.log("5. Change lastName while showFullName: true")
lastName.set("Who")
```
