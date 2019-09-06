export interface CostFunctionResults {
    errors: number[];
    worstError: number;
}
export declare type CostFunction = (values: number[]) => CostFunctionResults;
export interface Point {
    x: number;
    y: number;
    size: number;
    error: number;
}
export interface Results {
    points: Point[];
    cost: CostFunctionResults;
}
