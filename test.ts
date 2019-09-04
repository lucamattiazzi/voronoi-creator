import { stepOptimizer, optimizer } from './index'
import { Results } from './types'

async function test() {
  const sizes = Array(15)
    .fill(0)
    .map(Math.random)
  let results: Results
  let trials = 0
  while (true) {
    trials++
    console.time(`trial #${trials}`)
    results = await optimizer(sizes)
    console.timeEnd(`trial #${trials}`)
    console.log(results.cost.worstError)
    if (results.cost.worstError < 1.5) break
  }
  console.log(`Done in ${trials} trials`)
}

test()
