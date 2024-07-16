"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xLoginCookies = exports.xPostTweet = exports.xLogin = exports.index = void 0;
const TwitterApi_1 = __importDefault(require("../utils/TwitterApi"));
const index = (req, res) => {
    return res.json({ message: "Hello World" });
};
exports.index = index;
const xLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);
        const twitter = new TwitterApi_1.default();
        const login = await twitter.Login(username, password);
        AccountTwitter[username] = twitter;
        return res.json({ message: "success", key: username, reason: login, });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "error", reason: error });
    }
};
exports.xLogin = xLogin;
const xPostTweet = async (req, res) => {
    try {
        const { username } = req.query;
        const { text } = req.body;
        let responses = await AccountTwitter[username].CreateTweet(text);
        return res.json({ message: "success", reason: responses });
    }
    catch (error) {
        return res.json({ message: "error", reason: error });
    }
};
exports.xPostTweet = xPostTweet;
const xLoginCookies = async (req, res) => {
    try {
        const { username } = req.query;
        let twitter = new TwitterApi_1.default();
        let cookies = await twitter.LoginCookies(username);
        AccountTwitter[username] = twitter;
        return res.json({ message: "success restore", reason: cookies });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "error" });
    }
};
exports.xLoginCookies = xLoginCookies;
