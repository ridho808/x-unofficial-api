"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchPeople = exports.GetTweetUser = exports.GetinfoUser = exports.GetTrends = exports.GetLocation = exports.xLoginCookies = exports.xPostTweet = exports.xLogin = exports.index = void 0;
const TwitterApi_1 = __importDefault(require("../lib/TwitterApi"));
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const index = (req, res) => {
    return res.json({ message: "Hello World" });
};
exports.index = index;
const xLogin = async (req, res) => {
    try {
        const key = (0, uuid_1.v4)();
        const { username, password, email } = req.body;
        const twitter = new TwitterApi_1.default();
        await twitter.Login(username, password, email, key);
        AccountTwitter[key] = twitter;
        return res.status(200).json({ message: "success", keyaccess: key });
    }
    catch (error) {
        console.log(error.response);
        return res.status(400).json({ message: "failde login", });
    }
};
exports.xLogin = xLogin;
const xPostTweet = async (req, res) => {
    try {
        const { keyaccess } = req.query;
        const { text } = req.body;
        let responses = await AccountTwitter[keyaccess].CreateTweet(text);
        let { data } = responses;
        let { create_tweet } = data;
        let { tweet_results } = create_tweet;
        let { result } = tweet_results;
        let { legacy } = result;
        return res.status(201).json({ message: "success post tweet", data: legacy });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "failed post tweet", data: error });
    }
};
exports.xPostTweet = xPostTweet;
const xLoginCookies = async (req, res) => {
    try {
        const { keyaccess } = req.query;
        let twitter = new TwitterApi_1.default();
        await twitter.LoginCookies(keyaccess);
        AccountTwitter[keyaccess] = twitter;
        return res.status(200).json({ message: "success restore", key: keyaccess });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error" });
    }
};
exports.xLoginCookies = xLoginCookies;
const GetLocation = async (req, res) => {
    try {
        const { keyaccess } = req.query;
        const { location } = req.body;
        let response = await AccountTwitter[keyaccess].GetLocationTrends(location);
        return res.json({ message: "success", data: response });
    }
    catch (error) {
        return res.status(400).json({ message: "Failed", data: error });
    }
};
exports.GetLocation = GetLocation;
const GetTrends = async (req, res) => {
    try {
        const { keyaccess } = req.query;
        const { location } = req.body;
        let response = await AccountTwitter[keyaccess].GetLocationTrends(location);
        let { place_id } = response;
        console.log("get location id", place_id);
        await AccountTwitter[keyaccess].SetTrendsLocation(place_id);
        console.log("success settings trends");
        const { data } = await AccountTwitter[keyaccess].getTrends();
        let { explore_page } = data;
        let { body } = explore_page;
        let { initialTimeline } = body;
        let { timeline } = initialTimeline;
        let timelinetwo = timeline?.timeline;
        let { instructions } = timelinetwo;
        let { entries } = instructions[1];
        let trends = entries.find((entity) => entity?.sortIndex === "2");
        let { entryId, content } = trends;
        let { items } = content;
        return res.json({ message: "success get trends", data: { location: location, entryId: entryId, items } });
    }
    catch (error) {
        return res.status(400).json({ message: "Failed get trends", data: error });
    }
};
exports.GetTrends = GetTrends;
const GetinfoUser = async (req, res) => {
    try {
        const { keyaccess } = req.query;
        const { username } = req.body;
        const response = await AccountTwitter[keyaccess].getInfoUsers(username);
        let { result } = response?.data?.user;
        let { legacy } = result;
        return res.json({ message: "succes get info user", data: { ...legacy, userid: result?.rest_id } });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Failed get info user", data: [] });
    }
};
exports.GetinfoUser = GetinfoUser;
const GetTweetUser = async (req, res) => {
    try {
        const { keyaccess } = req.query;
        const { userid } = req.body;
        const data = await AccountTwitter[keyaccess].GetTweetUser(userid);
        let keys = data.result.timeline_v2.timeline.instructions.find((keys) => keys.type === "TimelineAddEntries");
        let entries = keys.entries;
        let items = entries.filter((item) => !item.entryId.includes("cursor") && !item.entryId.includes('who-to-follow'));
        let content = items.map((item) => item.content.itemContent);
        let results = content.filter((item) => item?.tweet_results?.result?.legacy?.full_text !== undefined);
        let full_text = results
            .map((items) => ({
            tweets: items?.tweet_results?.result?.legacy?.full_text,
            images: items?.tweet_results?.result?.legacy?.entities?.media?.map((item) => item?.media_url_https),
            created_at: (0, moment_1.default)(items?.tweet_results?.result?.legacy?.created_at).format("YYYY-MM-DD HH:mm:ss"),
        }));
        let final = full_text;
        return res.json({ message: "succes get tweet user", data: final });
    }
    catch (error) {
        return res.status(400).json({ message: "Failed get tweet user", data: [] });
    }
};
exports.GetTweetUser = GetTweetUser;
const SearchPeople = async (req, res) => {
    try {
        const { keyaccess, username } = req.query;
        const response = await AccountTwitter[keyaccess].SearchUser(username);
        return res.json({ message: "success search people", data: response });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Failed get info user", data: [] });
    }
};
exports.SearchPeople = SearchPeople;
