import { Results } from './types';
export declare function optimizer(sizes: number[], maxCost?: number, maxIterations?: number, maxStuckResults?: number): Promise<Results>;
export declare function stepOptimizer(sizes: number[], maxCost?: number, maxIterations?: number, maxStuckResults?: number): Promise<AsyncIterableIterator<Results>>;
