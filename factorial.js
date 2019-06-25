const T = require('./tiny-trampoline.js')

const factorial = n => {
  const loop = (n, acc = 1) => n > 1
    ? T.recurse(() => loop(n - 1, acc * n))
    : T.done(acc)
  const trampolinedLoop = T.trampoline(loop)
  return trampolinedLoop(n)
}

const ns = Array.from(Array(20).keys())
ns.forEach(n =>
  console.log(`factorial(${n}): ${factorial(n).toLocaleString()}`)
)
