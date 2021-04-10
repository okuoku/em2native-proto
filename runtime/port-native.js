import { createRequire } from 'module';

// Node.js currently does not support loading native module
// using ES6 module syntax
const require = createRequire(import.meta.url);
const process = require("process");
const nccc = require(process.cwd() + "/node-nccc");

export default {
    nccc: nccc
};
