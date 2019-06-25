const T = require('./tiny-trampoline.js')

const repeatChar = (ch, len) => {
  const loop = (ch, len, acc = '') => len > 0
    ? T.recurse(() => loop(ch, len - 1, acc + ch))
    : T.done(acc)
  const trampolinedLoop = T.trampoline(loop)
  return trampolinedLoop(ch, len)
}

console.log(repeatChar('-', 100000))
