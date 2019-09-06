import { Results } from './types';
export declare function optimizer(sizes: number[], maxCost?: number, maxIterations?: number, maxStuckResults?: number): Results;
export declare function stepOptimizer(sizes: number[], maxCost?: number, maxIterations?: number, maxStuckResults?: number): IterableIterator<Results>;
