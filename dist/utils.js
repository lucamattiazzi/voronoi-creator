"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function clamp(value, constraints) {
    return Math.min(Math.max(value, constraints[0]), constraints[1]);
}
function arrayReplace(array, idx, value) {
    return array.map((v, i) => (i === idx ? value : v));
}
function minIndex(values) {
    let minIdx;
    let min = Infinity;
    for (const idx in values) {
        const currentValue = values[idx];
        if (min <= currentValue)
            continue;
        min = currentValue;
        minIdx = idx;
    }
    return minIdx;
}
function getBestValue(costFunction, currentTheta, constraints = [-Infinity, Infinity], alpha, varIdx, currentCost) {
    const lower = clamp(currentTheta[varIdx] - alpha, constraints);
    const higher = clamp(currentTheta[varIdx] + alpha, constraints);
    const lowTheta = arrayReplace(currentTheta, varIdx, lower);
    const highTheta = arrayReplace(currentTheta, varIdx, higher);
    const lowCost = costFunction(lowTheta);
    const highCost = costFunction(highTheta);
    const costs = [lowCost, currentCost, highCost];
    const thetas = [lowTheta, currentTheta, highTheta];
    const idx = minIndex(costs.map(c => c.worstError));
    const bestTheta = thetas[idx];
    const bestCost = costs[idx];
    return { bestCost, bestTheta };
}
exports.getBestValue = getBestValue;
function pointsToTheta(points) {
    return points.reduce((a, p) => [...a, p.x, p.y], []);
}
exports.pointsToTheta = pointsToTheta;
function thetaToPoints(theta) {
    const points = [];
    for (let i = 0; i < theta.length; i += 2) {
        const x = theta[i];
        const y = theta[i + 1];
        points.push({ x, y });
    }
    return points;
}
exports.thetaToPoints = thetaToPoints;
function getClosestPoint(theta, point) {
    let closestIdx;
    let closestDistance = Infinity;
    for (let i = 0; i < theta.length; i += 2) {
        const dx = (theta[i] - point[0]) ** 2;
        const dy = (theta[i + 1] - point[1]) ** 2;
        const distance = dx + dy;
        if (distance >= closestDistance)
            continue;
        closestIdx = i;
        closestDistance = distance;
    }
    return closestIdx;
}
exports.getClosestPoint = getClosestPoint;
function getCostFunction(sizes) {
    return (theta) => {
        const areas = Array(sizes.length).fill(0);
        for (let i = 0; i < constants_1.AREA_POINTS; i++) {
            const point = [Math.random(), Math.random()];
            const closestIdx = getClosestPoint(theta, point);
            areas[closestIdx / 2] += 1 / constants_1.AREA_POINTS;
        }
        const errors = sizes.map((s, idx) => areas[idx] / s);
        const worstError = errors.reduce((worst, error) => {
            const validError = error === 0 ? 100 : error < 1 ? 1 / error : error;
            return Math.max(validError, worst);
        }, 0);
        return { worstError, errors };
    };
}
exports.getCostFunction = getCostFunction;
