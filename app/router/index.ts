import { Router } from "express";
import { GetLocation, GetTrends, GetTweetUser, GetinfoUser, SearchPeople, UserMediaCollection, index, xLogin, xLoginCookies, xPostTweet } from "../controller";
import checkQuery from "../middleware/checkquery";

const router = Router();

router.get("/", index)
/* AUTH TWITTER */
router.post("/login", xLogin)
router.get("/loadsession", checkQuery, xLoginCookies)
/* USER TWITTER */
router.get("/searchuser", checkQuery, SearchPeople)
router.get("/getinfouser", checkQuery, GetinfoUser)
router.get("/gettweetuser", checkQuery, GetTweetUser)
router.get("/getmediauser", checkQuery, UserMediaCollection)
/* LOCATION & TRENDS */
router.get("/getlocation", checkQuery, GetLocation)
router.get("/gettrends", checkQuery, GetTrends)
/* POST TWEET */
router.post("/posttweet", checkQuery, xPostTweet)

// router.post("/uploadphoto", checkQuery, UploadImages)


export default router