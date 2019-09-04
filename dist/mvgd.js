"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const constants_1 = require("./constants");
function resizeAlpha(alphaZero, currentCost, minCost) {
    return Math.log((20 * currentCost) / minCost) * alphaZero;
}
async function MVGD(rawCostFunction, thetaZero, constraints = [-Infinity, Infinity], minCost = 1.3, maxIterations = 1e3, alphaZero = 0.05) {
    const costFunction = (t) => Promise.resolve(rawCostFunction(t));
    const thetaSize = thetaZero.length;
    let currentTheta = [...thetaZero];
    let currentCost = await costFunction(currentTheta);
    let stuckLoops = 0;
    main: for (let iteration = 0; iteration < maxIterations; iteration++) {
        for (let varIdx = 0; varIdx < thetaSize; varIdx++) {
            const alpha = resizeAlpha(alphaZero, currentCost.worstError, minCost);
            const { bestTheta, bestCost } = await utils_1.getBestValue(costFunction, currentTheta, constraints, alpha, varIdx, currentCost);
            if (currentCost === bestCost) {
                stuckLoops++;
            }
            else {
                stuckLoops = 0;
            }
            currentCost = bestCost;
            currentTheta = bestTheta;
            if (stuckLoops >= constants_1.LOOPS_STUCK) {
                console.log('stuck');
                break main;
            }
            if (currentCost.worstError <= minCost) {
                console.log('converged');
                break main;
            }
        }
    }
    return { points: utils_1.thetaToPoints(currentTheta), cost: currentCost };
}
exports.MVGD = MVGD;
async function* MVGDgen(rawCostFunction, thetaZero, constraints = [-Infinity, Infinity], minCost = 1.3, maxIterations = 1e3, alphaZero = 0.05) {
    const costFunction = (t) => Promise.resolve(rawCostFunction(t));
    const thetaSize = thetaZero.length;
    let currentTheta = [...thetaZero];
    let currentCost = await costFunction(currentTheta);
    let stuckLoops = 0;
    main: for (let iteration = 0; iteration < maxIterations; iteration++) {
        for (let varIdx = 0; varIdx < thetaSize; varIdx++) {
            const alpha = resizeAlpha(alphaZero, currentCost.worstError, minCost);
            const { bestTheta, bestCost } = await utils_1.getBestValue(costFunction, currentTheta, constraints, alpha, varIdx, currentCost);
            if (currentCost === bestCost) {
                stuckLoops++;
            }
            else {
                stuckLoops = 0;
            }
            currentCost = bestCost;
            currentTheta = bestTheta;
            if (stuckLoops >= constants_1.LOOPS_STUCK) {
                console.log('stuck');
                break main;
            }
            if (currentCost.worstError <= minCost) {
                console.log('converged');
                break main;
            }
            yield { points: utils_1.thetaToPoints(currentTheta), cost: currentCost };
        }
    }
    return { points: utils_1.thetaToPoints(currentTheta), cost: currentCost };
}
exports.MVGDgen = MVGDgen;
