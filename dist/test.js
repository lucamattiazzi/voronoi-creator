"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function test() {
    const sizes = Array(15)
        .fill(0)
        .map(Math.random);
    const generator = await index_1.stepOptimizer(sizes);
    let value;
    while (true) {
        value = await generator.next();
        console.log('value', value.value.cost.worstError);
        if (value.done)
            break;
    }
}
test();
