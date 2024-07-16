import { Request, Response } from "express";
import TwitterApi from "../lib/TwitterApi";
import { v4 as uuidv4, v4 } from 'uuid';
import moment from "moment";
export const index = (req: Request, res: Response) => {
    return res.json({ message: "Hello World" })
}
export const xLogin = async (req: Request, res: Response) => {
    try {
        const key = v4()
        const { username, password, email } = req.body
        const twitter = new TwitterApi()
        await twitter.Login(username, password, email, key)
        AccountTwitter[key] = twitter
        return res.status(200).json({ message: "success", keyaccess: key })
    } catch (error: any) {
        console.log(error.response);
        return res.status(400).json({ message: "failde login", })
    }
}

export const xPostTweet = async (req: Request, res: Response) => {
    try {
        const { keyaccess } = req.query as { keyaccess: string }
        const { text } = req.body
        let responses = await AccountTwitter[keyaccess].CreateTweet(text)
        let { data } = responses
        let { create_tweet } = data
        let { tweet_results } = create_tweet
        let { result } = tweet_results
        let { legacy } = result
        return res.status(201).json({ message: "success post tweet", data: legacy })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "failed post tweet", data: error })
    }
}

export const xLoginCookies = async (req: Request, res: Response) => {
    try {
        const { keyaccess } = req.query as { keyaccess: string }
        let twitter = new TwitterApi()
        await twitter.LoginCookies(keyaccess);
        AccountTwitter[keyaccess] = twitter
        return res.status(200).json({ message: "success restore", key: keyaccess })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "error" })
    }
}

export const GetLocation = async (req: Request, res: Response) => {
    try {
        const { keyaccess } = req.query as { keyaccess: string }
        const { location } = req.body
        let response = await AccountTwitter[keyaccess].GetLocationTrends(location)
        return res.json({ message: "success", data: response })
    } catch (error) {
        return res.status(400).json({ message: "Failed", data: error })
    }
}

export const GetTrends = async (req: Request, res: Response) => {
    try {
        const { keyaccess } = req.query as { keyaccess: string }
        const { location } = req.body
        let response = await AccountTwitter[keyaccess].GetLocationTrends(location);
        let { place_id } = response

        console.log("get location id", place_id);
        await AccountTwitter[keyaccess].SetTrendsLocation(place_id)
        console.log("success settings trends");

        const { data } = await AccountTwitter[keyaccess].getTrends()

        let { explore_page } = data
        let { body } = explore_page
        let { initialTimeline } = body
        let { timeline } = initialTimeline
        let timelinetwo = timeline?.timeline
        let { instructions } = timelinetwo
        let { entries } = instructions[1]
        let trends = entries.find((entity: any) => entity?.sortIndex === "2");
        let { entryId, content } = trends
        let { items } = content
        return res.json({ message: "success get trends", data: { location: location, entryId: entryId, items } })
    } catch (error) {
        return res.status(400).json({ message: "Failed get trends", data: error })
    }
}

export const GetinfoUser = async (req: Request, res: Response) => {
    try {
        const { keyaccess } = req.query as { keyaccess: string }
        const { username } = req.body
        const response = await AccountTwitter[keyaccess].getInfoUsers(username)
        let { result } = response?.data?.user
        let { legacy } = result
        return res.json({ message: "succes get info user", data: { ...legacy, userid: result?.rest_id } })
    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: "Failed get info user", data: [] })

    }
}

export const GetTweetUser = async (req: Request, res: Response) => {
    try {
        const { keyaccess } = req.query as { keyaccess: string }
        const { userid } = req.body
        const data = await AccountTwitter[keyaccess].GetTweetUser(userid);
        let keys = data.result.timeline_v2.timeline.instructions.find((keys: any) => keys.type === "TimelineAddEntries")
        let entries = keys.entries
        let items = entries.filter((item: any) => !item.entryId.includes("cursor") && !item.entryId.includes('who-to-follow'))
        let content = items.map((item: any) => item.content.itemContent)
        let results = content.filter((item: any) => item?.tweet_results?.result?.legacy?.full_text !== undefined)
        let full_text = results
            .map((items: any) =>
            ({
                tweets: items?.tweet_results?.result?.legacy?.full_text,
                images: items?.tweet_results?.result?.legacy?.entities?.media?.map((item: any) => item?.media_url_https),
                created_at: moment(items?.tweet_results?.result?.legacy?.created_at).format("YYYY-MM-DD HH:mm:ss"),
            }))
        let final = full_text
        return res.json({ message: "succes get tweet user", data: final })
    } catch (error) {
        return res.status(400).json({ message: "Failed get tweet user", data: [] })
    }
}


export const SearchPeople = async (req: Request, res: Response) => {
    try {
        const { keyaccess, username } = req.query as { keyaccess: string, username: string }
        const response = await AccountTwitter[keyaccess].SearchUser(username)
        return res.json({ message: "success search people", data: response })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Failed get info user", data: [] })
    }
}