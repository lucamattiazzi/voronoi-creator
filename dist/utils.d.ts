import { Point, CostFunction, CostFunctionResults } from './types';
export declare function getBestValue(costFunction: CostFunction, currentTheta: number[], constraints: [number, number], alpha: number, varIdx: number, currentCost: CostFunctionResults): {
    bestCost: CostFunctionResults;
    bestTheta: number[];
};
export declare function pointsToTheta(points: Point[]): number[];
export declare function thetaToPoints(theta: number[]): Point[];
export declare function getClosestPoint(theta: number[], point: [number, number]): number;
export declare function getCostFunction(sizes: number[]): CostFunction;
