"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function test() {
    const sizes = Array(15)
        .fill(0)
        .map(Math.random);
    let results;
    let trials = 0;
    while (true) {
        trials++;
        console.time(`trial #${trials}`);
        results = await index_1.optimizer(sizes);
        console.timeEnd(`trial #${trials}`);
        console.log(results.cost.worstError);
        if (results.cost.worstError < 1.5)
            break;
    }
    console.log(`Done in ${trials} trials`);
}
test();
