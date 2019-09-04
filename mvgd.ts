import { CostFunction, AsyncCostFunction, Results } from './types'
import { getBestValue, thetaToPoints } from './utils'

function resizeAlpha(alphaZero: number, currentCost: number, minCost: number) {
  return Math.log((10 * currentCost) / minCost) * alphaZero
}

/**
 * Tries to find a local minimum or maximum for a multivariate cost function whose partial derivatives are unknown.
 * @param rawCostFunction - Multivariate function, can be async, will be wrapped in promise if not async
 * @param thetaZero - Starting state of the function variables
 * @param constraints - When given, every iteration of the perturbation will clamp the values between the constraints
 * @param minCost - Value of cost under which the optimization will be considered successful
 * @param maxIterations - If the optimization does not converge, it will stop after this number of iterations
 * @param alphaZero - The learning rate of the algorithm, negative to find a maximum, positive to find a minimum. Will be rescaled while approaching the local minimum
 * @returns An array of parameters with the minimum result found
 **/
export async function MVGD(
  rawCostFunction: CostFunction | AsyncCostFunction,
  thetaZero: number[],
  constraints: [number, number] = [-Infinity, Infinity],
  minCost: number = 1.3,
  maxIterations: number = 1e3,
  alphaZero: number = 0.05,
): Promise<Results> {
  // wraps the cost function to always treat it as an async function
  const costFunction: AsyncCostFunction = (t: number[]) => Promise.resolve(rawCostFunction(t))
  const thetaSize = thetaZero.length

  let currentTheta = [...thetaZero]
  let currentCost = await costFunction(currentTheta)

  main: for (let iteration = 0; iteration < maxIterations; iteration++) {
    for (let varIdx = 0; varIdx < thetaSize; varIdx++) {
      const alpha = resizeAlpha(alphaZero, currentCost.worstError, minCost)
      const { bestTheta, bestCost } = await getBestValue(
        costFunction,
        currentTheta,
        constraints,
        alpha,
        varIdx,
        currentCost,
      )
      currentCost = bestCost
      currentTheta = bestTheta
      if (currentCost.worstError <= minCost) break main
    }
  }
  return { points: thetaToPoints(currentTheta), cost: currentCost }
}

/**
 * Tries to find a local minimum or maximum for a multivariate cost function whose partial derivatives are unknown.
 * @param rawCostFunction - Multivariate function, can be async, will be wrapped in promise if not async
 * @param thetaZero - Starting state of the function variables
 * @param constraints - When given, every iteration of the perturbation will clamp the values between the constraints
 * @param minCost - Value of cost under which the optimization will be considered successful
 * @param maxIterations - If the optimization does not converge, it will stop after this number of iterations
 * @param alphaZero - The learning rate of the algorithm, negative to find a maximum, positive to find a minimum. Will be rescaled while approaching the local minimum
 * @returns A generator that yields each step each time
 **/
export async function* MVGDgen(
  rawCostFunction: CostFunction | AsyncCostFunction,
  thetaZero: number[],
  constraints: [number, number] = [-Infinity, Infinity],
  minCost: number = 1.3,
  maxIterations: number = 1e3,
  alphaZero: number = 0.05,
): AsyncIterableIterator<Results> {
  // wraps the cost function to always treat it as an async function
  const costFunction: AsyncCostFunction = (t: number[]) => Promise.resolve(rawCostFunction(t))
  const thetaSize = thetaZero.length

  let currentTheta = [...thetaZero]
  let currentCost = await costFunction(currentTheta)

  main: for (let iteration = 0; iteration < maxIterations; iteration++) {
    for (let varIdx = 0; varIdx < thetaSize; varIdx++) {
      const alpha = resizeAlpha(alphaZero, currentCost.worstError, minCost)
      const { bestTheta, bestCost } = await getBestValue(
        costFunction,
        currentTheta,
        constraints,
        alpha,
        varIdx,
        currentCost,
      )
      currentCost = bestCost
      currentTheta = bestTheta
      if (currentCost.worstError <= minCost) break main
      yield { points: thetaToPoints(currentTheta), cost: currentCost }
    }
  }
  return { points: thetaToPoints(currentTheta), cost: currentCost }
}
