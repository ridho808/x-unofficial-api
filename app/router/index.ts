import { Router } from "express";
import { index, xLogin, xLoginCookies, xPostTweet } from "../controller";

const router = Router();

router.get("/", index)
router.post("/login", xLogin)
router.post("/posttweet", xPostTweet)
router.get("/loadcookies", xLoginCookies);
export default router