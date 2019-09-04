import { stepOptimizer, optimizer } from './index'
import { Results } from './types'

async function test() {
  const sizes = Array(15)
    .fill(0)
    .map(Math.random)
  const generator = await stepOptimizer(sizes)
  let value: IteratorResult<Results>
  while (true) {
    value = await generator.next()
    console.log('value', value.value.cost.worstError)
    if (value.done) break
  }
  // console.log(value.value)
}

test()
