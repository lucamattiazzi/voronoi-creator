import { AsyncCostFunction, Point, CostFunction, CostFunctionResults } from './types'
import { AREA_POINTS } from './constants'

function clamp(value: number, constraints: [number, number]): number {
  return Math.min(Math.max(value, constraints[0]), constraints[1])
}

function arrayReplace(array: number[], idx: number, value: number) {
  return array.map((v, i) => (i === idx ? value : v))
}

function minIndex(values: number[]): number {
  let minIdx
  let min = Infinity
  for (const idx in values) {
    const currentValue = values[idx]
    if (min <= currentValue) continue
    min = currentValue
    minIdx = idx
  }
  return minIdx
}

export async function getBestValue(
  costFunction: AsyncCostFunction,
  currentTheta: number[],
  constraints: [number, number] = [-Infinity, Infinity],
  alpha: number,
  varIdx: number,
  currentCost: CostFunctionResults,
): Promise<{ bestCost: CostFunctionResults; bestTheta: number[] }> {
  const lower = clamp(currentTheta[varIdx] - alpha, constraints)
  const higher = clamp(currentTheta[varIdx] + alpha, constraints)
  const lowTheta = arrayReplace(currentTheta, varIdx, lower)
  const highTheta = arrayReplace(currentTheta, varIdx, higher)
  const lowCost = await costFunction(lowTheta)
  const highCost = await costFunction(highTheta)
  const costs = [lowCost, currentCost, highCost]
  const thetas = [lowTheta, currentTheta, highTheta]
  const idx = minIndex(costs.map(c => c.worstError))
  const bestTheta = thetas[idx]
  const bestCost = costs[idx]
  return { bestCost, bestTheta }
}

export function pointsToTheta(points: Point[]): number[] {
  return points.reduce<number[]>((a, p) => [...a, p.x, p.y], [])
}

export function thetaToPoints(theta: number[]): Point[] {
  const points = []
  for (let i = 0; i < theta.length; i += 2) {
    const x = theta[i]
    const y = theta[i + 1]
    points.push({ x, y })
  }
  return points
}

export function getClosestPoint(theta: number[], point: [number, number]) {
  let closestIdx: number
  let closestDistance = Infinity
  for (let i = 0; i < theta.length; i += 2) {
    const dx = (theta[i] - point[0]) ** 2
    const dy = (theta[i + 1] - point[1]) ** 2
    const distance = dx + dy
    if (distance >= closestDistance) continue
    closestIdx = i
    closestDistance = distance
  }
  return closestIdx
}

export function getCostFunction(sizes: number[]): CostFunction {
  return (theta: number[]) => {
    const areas = Array(sizes.length).fill(0)
    for (let i = 0; i < AREA_POINTS; i++) {
      const point = [Math.random(), Math.random()] as [number, number]
      const closestIdx = getClosestPoint(theta, point)
      areas[closestIdx / 2] += 1 / AREA_POINTS
    }
    const errors = sizes.map((s, idx) => areas[idx] / s)
    const worstError = errors.reduce<number>((worst, error) => {
      const validError = error === 0 ? 100 : error < 1 ? 1 / error : error
      return Math.max(validError, worst)
    }, 0)
    return { worstError, errors }
  }
}
