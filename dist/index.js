"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const mvgd_1 = require("./mvgd");
async function optimizer(sizes, maxCost = 1.5, maxIterations = 1e4, maxStuckResults = 1e3) {
    if (sizes.some(s => s === 0))
        throw Error('Size cannot be 0');
    const totalSize = sizes.reduce((a, n) => a + n, 0);
    const theta = Array(sizes.length * 2)
        .fill(0)
        .map(Math.random);
    const normalizedSizes = sizes.map(s => s / totalSize);
    const costFunction = utils_1.getCostFunction(normalizedSizes);
    return mvgd_1.MVGD(costFunction, theta, [0, 1], maxCost, maxIterations, maxStuckResults);
}
exports.optimizer = optimizer;
async function stepOptimizer(sizes, maxCost = 1.5, maxIterations = 1e4, maxStuckResults = 1e3) {
    if (sizes.some(s => s === 0))
        throw Error('Size cannot be 0');
    const totalSize = sizes.reduce((a, n) => a + n, 0);
    const theta = Array(sizes.length * 2)
        .fill(0)
        .map(Math.random);
    const normalizedSizes = sizes.map(s => s / totalSize);
    const costFunction = utils_1.getCostFunction(normalizedSizes);
    return mvgd_1.MVGDgen(costFunction, theta, [0, 1], maxCost, maxIterations, maxStuckResults);
}
exports.stepOptimizer = stepOptimizer;
