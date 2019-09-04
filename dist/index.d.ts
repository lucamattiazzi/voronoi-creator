import { Results } from './types';
export declare function optimizer(sizes: number[], maxCost?: number): Promise<Results>;
export declare function stepOptimizer(sizes: number[], maxCost?: number): Promise<AsyncIterableIterator<Results>>;
