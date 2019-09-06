// type CostFunction = (values: number[]) => number
// type AsyncCostFunction = (values: number[]) => Promise<number>
// type GeneratorFn = (i: number) => number

// const ALPHA = 0.602 // because of **MAGIC**
// const GAMMA = 0.101 // because of **MAGIC**
// const A = 1 // because of **MAGIC**
// const A_BIG = 2 // because of **MAGIC**
// const C = 1 // because of **MAGIC**

// function clamp(value: number, constraints: [number, number]): number {
//   return Math.min(Math.max(value, constraints[0]), constraints[1])
// }

// /**
//  * Returns a Bernouilli distribution with size `size` and extent `-value:+value`.
//  * @param size - Size of the distribution
//  * @param value - Absolute value of the possible values
//  * @returns Array of numbers
//  **/
// function bernouilli(size: number, value: number): number[] {
//   return Array(size)
//     .fill(0)
//     .map(() => value * Math.sign(Math.random() - 0.5))
// }

// /**
//  * Given a function `fn` that gets a number and returns a number, returns a generator that yelds `fn(i)` for `i` in `0-Infinity`.
//  * @param fn - Function that maps number to number
//  * @returns Generator
//  **/
// function* getGenerator(fn: GeneratorFn) {
//   let i = 0
//   while (true) {
//     yield fn(i++)
//   }
// }

// function akGenerator() {
//   const fn = (i: number) => A / (i + 1 + A_BIG) ** ALPHA
//   return getGenerator(fn)
// }

// function ckGenerator() {
//   const fn = (i: number) => C / (i + 1) ** GAMMA
//   return getGenerator(fn)
// }

// async function getGradients(
//   costFunction: CostFunction,
//   theta: number[],
//   ckValue: number,
//   constraints: [number, number],
// ): Promise<number[]> {
//   const deltaVector = bernouilli(theta.length, 0.1)
//   const minusPerturbed = theta.map((val, idx) =>
//     clamp(val + ckValue * deltaVector[idx], constraints),
//   )
//   const plusPerturbed = theta.map((val, idx) =>
//     clamp(val - ckValue * deltaVector[idx], constraints),
//   )
//   const minusCost = costFunction(minusPerturbed)
//   const plusCost = costFunction(plusPerturbed)
//   const gradient = deltaVector.map(delta => (plusCost - minusCost) / (2 * ckValue * delta))
//   return gradient
// }

// /**
//  * Tries to find a minimum or a maximum for a multivariate cost function whose partial derivatives are unknown.
//  * @param rawCostFunction - Multivariate function, can be async, will be wrapped in promise if not async
//  * @param thetaZero - Starting state of the function
//  * @param alpha - The learning rate of the algorithm, negative to find a maximum, positive to find a minimum
//  * @returns Magic
//  **/
// export async function SPSA(
//   costFunction: CostFunction,
//   thetaZero: number[],
//   constraints: [number, number] = [-Infinity, Infinity],
//   minCost: number = 1.5,
//   maxIterations: number = 1e3,
// ): number[] {
//   let theta = [...thetaZero]
//   let iterations = 0
//   const ak = akGenerator()
//   const ck = ckGenerator()
//   const zeroCost = costFunction(theta)
//   console.log('zeroCost', zeroCost)
//   while (true) {
//     const gradients = getGradients(costFunction, theta, ck.next().value, constraints)
//     const nextAk = ak.next().value
//     theta = theta.map((value, idx) => clamp(value - nextAk * gradients[idx], constraints))
//     const currentCost = costFunction(theta)
//     console.log('currentCost', currentCost)
//     if (currentCost < minCost) return theta
//     if (++iterations >= maxIterations) return theta
//   }
// }
