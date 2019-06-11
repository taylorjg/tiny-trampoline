const T = fn => (...args) => {
  let returnValue = fn(...args)
  for (; ;) {
    if (typeof returnValue === 'function') {
      returnValue = returnValue()
    } else {
      return returnValue
    }
  }
}

const factorial = T(function _factorial(n, acc = 1) {
  return n > 1
    ? () => _factorial(n - 1, acc * n)
    : acc
})

const ns = Array.from(Array(20).keys())
ns.forEach(n =>
  console.log(`factorial(${n}): ${factorial(n).toLocaleString()}`)
)
