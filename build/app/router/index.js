"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const checkquery_1 = __importDefault(require("../middleware/checkquery"));
const router = (0, express_1.Router)();
router.get("/", controller_1.index);
router.post("/login", controller_1.xLogin);
router.get("/loadsession", checkquery_1.default, controller_1.xLoginCookies);
router.get("/searchuser", checkquery_1.default, controller_1.SearchPeople);
router.post("/getlocation", checkquery_1.default, controller_1.GetLocation);
router.post("/getinfouser", checkquery_1.default, controller_1.GetinfoUser);
router.post("/gettweetuser", checkquery_1.default, controller_1.GetTweetUser);
router.post("/gettrends", checkquery_1.default, controller_1.GetTrends);
router.post("/posttweet", checkquery_1.default, controller_1.xPostTweet);
exports.default = router;
