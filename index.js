const T = require('./tiny-trampoline.js')

const factorial = T.trampoline(function _factorial(n, acc = 1) {
  return n > 1
    ? T.recurse(() => _factorial(n - 1, acc * n))
    : T.done(acc)
})

const ns = Array.from(Array(20).keys())
ns.forEach(n =>
  console.log(`factorial(${n}): ${factorial(n).toLocaleString()}`)
)
