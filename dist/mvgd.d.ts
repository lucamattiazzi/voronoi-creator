import { CostFunction, AsyncCostFunction, Results } from './types';
export declare function MVGD(rawCostFunction: CostFunction | AsyncCostFunction, thetaZero: number[], constraints: [number, number], costThreshold: number, maxIterations: number, maxStuckResults: number, alphaZero?: number): Promise<Results>;
export declare function MVGDgen(rawCostFunction: CostFunction | AsyncCostFunction, thetaZero: number[], constraints: [number, number], costThreshold: number, maxIterations: number, maxStuckResults: number, alphaZero?: number): AsyncIterableIterator<Results>;
