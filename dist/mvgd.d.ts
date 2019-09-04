import { CostFunction, AsyncCostFunction, Results } from './types';
export declare function MVGD(rawCostFunction: CostFunction | AsyncCostFunction, thetaZero: number[], constraints?: [number, number], minCost?: number, maxIterations?: number, alphaZero?: number): Promise<Results>;
export declare function MVGDgen(rawCostFunction: CostFunction | AsyncCostFunction, thetaZero: number[], constraints?: [number, number], minCost?: number, maxIterations?: number, alphaZero?: number): AsyncIterableIterator<Results>;
