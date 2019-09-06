"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function resizeAlpha(alphaZero, currentCost, costThreshold) {
    return Math.log((20 * currentCost) / costThreshold) * alphaZero;
}
function MVGD(costFunction, thetaZero, constraints = [-Infinity, Infinity], costThreshold, maxIterations, maxStuckResults, alphaZero = 0.05) {
    const thetaSize = thetaZero.length;
    let currentTheta = [...thetaZero];
    let currentCost = costFunction(currentTheta);
    let stuckLoops = 0;
    main: for (let iteration = 0; iteration < maxIterations; iteration++) {
        for (let varIdx = 0; varIdx < thetaSize; varIdx++) {
            const alpha = resizeAlpha(alphaZero, currentCost.worstError, costThreshold);
            const { bestTheta, bestCost } = utils_1.getBestValue(costFunction, currentTheta, constraints, alpha, varIdx, currentCost);
            if (currentCost === bestCost) {
                stuckLoops++;
            }
            else {
                stuckLoops = 0;
            }
            currentCost = bestCost;
            currentTheta = bestTheta;
            if (stuckLoops >= maxStuckResults) {
                console.log('stuck');
                break main;
            }
            if (currentCost.worstError <= costThreshold) {
                console.log('converged');
                break main;
            }
        }
    }
    return { points: utils_1.thetaToPoints(currentTheta), cost: currentCost };
}
exports.MVGD = MVGD;
function* MVGDgen(costFunction, thetaZero, constraints = [-Infinity, Infinity], costThreshold, maxIterations, maxStuckResults, alphaZero = 0.05) {
    const thetaSize = thetaZero.length;
    let currentTheta = [...thetaZero];
    let currentCost = costFunction(currentTheta);
    let stuckLoops = 0;
    main: for (let iteration = 0; iteration < maxIterations; iteration++) {
        for (let varIdx = 0; varIdx < thetaSize; varIdx++) {
            const alpha = resizeAlpha(alphaZero, currentCost.worstError, costThreshold);
            const { bestTheta, bestCost } = utils_1.getBestValue(costFunction, currentTheta, constraints, alpha, varIdx, currentCost);
            if (currentCost === bestCost) {
                stuckLoops++;
            }
            else {
                stuckLoops = 0;
            }
            currentCost = bestCost;
            currentTheta = bestTheta;
            if (stuckLoops >= maxStuckResults) {
                console.log('stuck');
                break main;
            }
            if (currentCost.worstError <= costThreshold) {
                console.log('converged');
                break main;
            }
            yield { points: utils_1.thetaToPoints(currentTheta), cost: currentCost };
        }
    }
    return { points: utils_1.thetaToPoints(currentTheta), cost: currentCost };
}
exports.MVGDgen = MVGDgen;
