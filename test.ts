import { stepOptimizer, optimizer } from './index'
import { Results } from './types'

async function test() {
  const sizes = Array(15)
    .fill(0)
    .map(Math.random)
  const results = await optimizer(sizes)
  console.log(results)
}

test()
