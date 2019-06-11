const RECURSE = Symbol('RECURSE')
const DONE = Symbol('DONE')

const T = {
  recurse: thunk => ({
    type: RECURSE,
    thunk
  }),
  done: result => ({
    type: DONE,
    result
  }),
  trampoline: fn => (...args) => {
    let returnValue = fn(...args)
    for (; ;) {
      switch (returnValue.type) {
        case RECURSE:
          returnValue = returnValue.thunk()
          break
        case DONE:
          return returnValue.result
        default:
          throw new Error(`Unexpected returnValue.type ${returnValue.type}`)
      }
    }
  }
}

const factorial = T.trampoline(function _factorial(n, acc = 1) {
  return n > 1
    ? T.recurse(() => _factorial(n - 1, acc * n))
    : T.done(acc)
})

const ns = Array.from(Array(20).keys())
ns.forEach(n =>
  console.log(`factorial(${n}): ${factorial(n).toLocaleString()}`)
)
