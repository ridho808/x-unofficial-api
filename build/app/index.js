"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
global.AccountTwitter = {};
const app = (0, express_1.default)();
const port = 3535;
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
