import { Results } from './types'
import { getCostFunction } from './utils'
import { MVGDgen, MVGD } from './mvgd'

/**
 * Tries to find a Voronoi tasselation given surfaces of each cell
 * @param sizes - Sizes of each cell (size cannot be 0), whole available area will be divided between those cells
 * @param maxCost - Optimizer will stop after maxIterations or after the worst error (as ratio size/realSize) is lower than this value
 * @param maxIterations - If the optimization does not converge, it will stop after this number of iterations
 * @returns An object with the points coordinates and the worst error ratio
 **/
export async function optimizer(sizes: number[], maxCost?: number): Promise<Results> {
  if (sizes.some(s => s === 0)) throw Error('Size cannot be 0')

  const totalSize = sizes.reduce<number>((a, n) => a + n, 0)
  const theta = Array(sizes.length * 2)
    .fill(0)
    .map(Math.random)
  const normalizedSizes = sizes.map(s => s / totalSize)
  const costFunction = getCostFunction(normalizedSizes)
  return MVGD(costFunction, theta, [0, 1], maxCost)
}

/**
 * Tries to find a Voronoi tasselation given surfaces of each cell
 * @param sizes - Sizes of each cell (size cannot be 0), whole available area will be divided between those cells
 * @param maxCost - Optimizer will stop after maxIterations or after the worst error (as ratio size/realSize) is lower than this value
 * @param maxIterations - If the optimization does not converge, it will stop after this number of iterations
 * @returns An iterator that yields each step with the points coordinates and the worst error ratio
 **/
export async function stepOptimizer(
  sizes: number[],
  maxCost?: number,
): Promise<AsyncIterableIterator<Results>> {
  if (sizes.some(s => s === 0)) throw Error('Size cannot be 0')

  const totalSize = sizes.reduce<number>((a, n) => a + n, 0)
  const theta = Array(sizes.length * 2)
    .fill(0)
    .map(Math.random)
  const normalizedSizes = sizes.map(s => s / totalSize)
  const costFunction = getCostFunction(normalizedSizes)
  return MVGDgen(costFunction, theta, [0, 1], maxCost)
}
