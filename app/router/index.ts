import { Router } from "express";
import { GetLocation, GetTrends, GetTweetUser, GetinfoUser, SearchPeople, index, xLogin, xLoginCookies, xPostTweet } from "../controller";
import checkQuery from "../middleware/checkquery";

const router = Router();

router.get("/", index)
router.post("/login", xLogin)

router.get("/loadsession", checkQuery, xLoginCookies)
router.get("/searchuser", checkQuery, SearchPeople)

router.post("/getlocation", checkQuery, GetLocation)

router.post("/getinfouser", checkQuery, GetinfoUser)
router.post("/gettweetuser", checkQuery, GetTweetUser)

router.post("/gettrends", checkQuery, GetTrends)
router.post("/posttweet", checkQuery, xPostTweet)

export default router