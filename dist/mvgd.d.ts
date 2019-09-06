import { CostFunction, Results } from './types';
export declare function MVGD(costFunction: CostFunction, thetaZero: number[], constraints: [number, number], costThreshold: number, maxIterations: number, maxStuckResults: number, alphaZero?: number): Results;
export declare function MVGDgen(costFunction: CostFunction, thetaZero: number[], constraints: [number, number], costThreshold: number, maxIterations: number, maxStuckResults: number, alphaZero?: number): IterableIterator<Results>;
