"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
async function test() {
    const sizes = Array(15)
        .fill(0)
        .map(Math.random);
    const results = await index_1.optimizer(sizes);
    console.log(results);
}
test();
