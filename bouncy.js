const RECURSE = Symbol('RECURSE')
const DONE = Symbol('DONE')

const recurse = thunk => ({
  type: RECURSE,
  thunk
})

const done = result => ({
  type: DONE,
  result
})

const trampoline = fn => (...args) => {
  let returnValue = fn(...args)
  for (; ;) {
    switch (returnValue.type) {
      case RECURSE:
        returnValue = returnValue.thunk()
        break
      case DONE:
        return returnValue.result
    }
  }
}

module.exports = {
  recurse,
  done,
  trampoline
}
