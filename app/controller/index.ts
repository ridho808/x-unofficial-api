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

        if (!username || !password || !email) return res.status(400).json({ message: "Failed Login your field Invalid" });

        const twitter = new TwitterApi()

        await twitter.Login(username, password, email, key)

        AccountTwitter[key] = twitter
        let exp = moment().add(3, "days")

        return res.status(200).json({ message: "success", keyaccess: key, expired_keyaccess: exp })
    } catch (error: any) {
        console.log(error.response);
        return res.status(400).json({ message: "failde login", })
    }
}

export const xPostTweet = async (req: Request, res: Response) => {
    try {
        const { keyaccess } = req.query as { keyaccess: string }
        const { tweet } = req.body as { tweet: string }

        if (tweet.length > 280 || tweet.length == 0) return res.status(400).json({
            message: "Failed Create Tweet [tweet] invalid"
        })

        let responses = await AccountTwitter[keyaccess].CreateTweet(tweet)
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
        if (!keyaccess) return res.json({ message: "Invalid Keyacess Please Login Your Account" })
        if (AccountTwitter[keyaccess] !== undefined) return res.json({ message: "Your account has been login" })
        let twitter = new TwitterApi()
        await twitter.LoginCookies(keyaccess);
        AccountTwitter[keyaccess] = twitter
        await AccountTwitter[keyaccess].HelperLogin()
        return res.status(200).json({ message: "success restore session", key: keyaccess })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "failed restore session", data: "BAD REQUEST 404" })
    }
}

export const GetLocation = async (req: Request, res: Response) => {
    try {
        const { keyaccess, location } = req.query as { keyaccess: string, location: string }
        if (!location) return res.status(400).json({ message: "Failed Get Location [location] Invalid" })
        let response = await AccountTwitter[keyaccess].GetLocationTrends(location)
        return res.json({ message: "success", data: response })
    } catch (error) {
        return res.status(400).json({ message: "Failed", data: error })
    }
}

export const GetTrends = async (req: Request, res: Response) => {
    try {
        const { keyaccess, location } = req.query as { keyaccess: string, location: string }

        if (!location) return res.status(400).json({ message: "Failed Get Location [location] Invalid" })

        let response = await AccountTwitter[keyaccess].GetLocationTrends(location);
        let { place_id } = response
        await AccountTwitter[keyaccess].SetTrendsLocation(place_id)
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
        const { keyaccess, username } = req.query as { keyaccess: string, username: string }

        if (!username || username.length > 50) return res.status(400).json({ message: "Failed Get Info Users username Invalid" })

        const response = await AccountTwitter[keyaccess].getInfoUsers(username)
        let { result } = response?.data?.user
        if (!result) {
            return res.status(400).json({ message: "Failed get info user", data: [] })
        }
        let { legacy } = result
        return res.json({ message: "succes get info user", data: { ...legacy, userid: result?.rest_id } })
    } catch (error) {
        console.log(error);

        return res.status(400).json({ message: "Failed get info user", data: [] })

    }
}

export const GetTweetUser = async (req: Request, res: Response) => {

    try {
        const { keyaccess, userid } = req.query as { keyaccess: string, userid: string }

        if (!userid) return res.status(400).json({ message: "Failed Get Info Users userid Invalid" })

        const data = await AccountTwitter[keyaccess].GetTweetUser(userid);
        let keys = data?.result?.timeline_v2?.timeline?.instructions?.find((keys: any) => keys.type === "TimelineAddEntries")
        let entries = keys.entries
        let items = entries.filter((item: any) => !item.entryId.includes("cursor") && !item.entryId.includes('who-to-follow'))
        let content = items.map((item: any) => item.content.itemContent)
        let results = content.filter((item: any) => item?.tweet_results?.result?.legacy?.full_text !== undefined)
        let full_text = results
            .map((items: any) =>
            ({
                tweets: items?.tweet_results?.result?.legacy?.full_text,
                images: items?.tweet_results?.result?.legacy?.entities?.media?.map((item: any) => item?.media_url_https),
                created_at: items?.tweet_results?.result?.legacy?.created_at
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
        if (!username) return res.status(400).json({ message: "Failed Get Info Users username Invalid" })
        const response = await AccountTwitter[keyaccess].SearchUser(username)
        return res.json({ message: "success search people", data: response })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Failed get info user", data: [] })
    }
}

export const UserMediaCollection = async (req: Request, res: Response) => {
    try {
        const { keyaccess, userid, next } = req.query as { keyaccess: string, userid: string, next?: string }
        let response
        if (next != undefined) {
            response = await AccountTwitter[keyaccess].GetMediaUser(userid, next);

            let { data } = response
            let { user } = data
            let timelinev2 = user?.result?.timeline_v2
            let ent = timelinev2?.timeline?.instructions?.find((item: any) => {
                return item.type === "TimelineAddToModule"
            });
            let cursor = timelinev2?.timeline?.instructions?.find((item: any) => {
                return item.type === "TimelineAddEntries"
            });
            let getValues = cursor?.entries?.find((values: any) => {
                return values?.content?.cursorType.includes("Bottom")
            })

            let items = ent?.moduleItems?.map((items: any) => {
                let media = items?.item?.itemContent?.tweet_results?.result?.legacy?.entities?.media[0]
                let caption = items?.item?.itemContent?.tweet_results?.result?.legacy?.full_text
                let date = items?.item?.itemContent?.tweet_results?.result?.legacy?.created_at
                return {
                    caption: caption,
                    created_at: date,
                    media: {
                        display_url: media?.display_url,
                        type: media?.type,
                        media_url_https: media?.media_url_https,
                        extended_url: media?.expanded_url,
                        url: media?.url,
                        original_file: media?.video_info?.variants[0]
                    },
                }
            })
            await Promise.all([ent, cursor, items])
            return res.json({
                message: "success get media user",
                data: {
                    next_query: getValues?.content?.value,
                    items: items
                }
            })
        } else {
            response = await AccountTwitter[keyaccess].GetMediaUser(userid);
            let { data } = response
            let { user } = data
            let timelinev2 = user?.result?.timeline_v2
            let ent = timelinev2?.timeline?.instructions.find((item: any) => {
                return item.type === "TimelineAddEntries"
            });
            let entcursor = ent?.entries?.find((item: any) => (item?.entryId?.includes("cursor-bottom")))
            let entries = ent?.entries?.find((item: any) => (item?.entryId?.includes("profile-grid")))
            let items = entries?.content?.items
            let result = items?.map((item: any) => {
                let media = item?.item?.itemContent?.tweet_results?.result?.legacy?.entities?.media[0]
                let caption = item?.item?.itemContent?.tweet_results?.result?.legacy?.full_text
                let date = item?.item?.itemContent?.tweet_results?.result?.legacy?.created_at
                return {
                    caption: caption,
                    created_at: date,
                    media: {
                        display_url: media?.display_url,
                        type: media?.type,
                        media_url_https: media?.media_url_https,
                        extended_url: media?.expanded_url,
                        url: media?.url,
                        original_file: media?.video_info?.variants[0]
                    },
                }
            })
            await Promise.all([ent, entcursor, result])
            return res.json({
                message: "success get media user",
                data: {
                    next_query: entcursor?.content?.value,
                    items: result
                }
            })
        }


    } catch (error) {
        return res.status(400).json({ message: "failed get media user", data: [] })
    }
}
// const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
// export const UploadImages = async (req: Request, res: Response) => {
//     try {
//         const { keyaccess } = req.query as { keyaccess: string }
//         const { media } = req.files as any
//         const { caption } = req.body

//         const uploadsDir = path.join(__dirname, 'uploads');
//         if (!fs.existsSync(uploadsDir)) {
//             fs.mkdirSync(uploadsDir);
//         }

//         const uploadPath = path.join(uploadsDir, media.name);
//         media.mv(uploadPath, async (err: any) => {
//             if (err) {
//                 return res.status(500).send(err);
//             }
//             // let bin = fs.readFileSync(uploadPath);
//             await delay(3000)
//             let response = await AccountTwitter[keyaccess].PostImages(media.size, media.mimetype);
//             console.log(response.media_id);
//             let append = await AccountTwitter[keyaccess].PostAppendImages(response.media_id, uploadPath);
//             return res.json({ message: "success upload images", data: append })
//         });

//         // console.log("Json UPLOAD APPEND");
//         // console.log("Json UPLOAD END", append);
//         // let respon = await AccountTwitter[keyaccess].PostFINALImages(response.media_id, media.md5);
//         // console.log("Json UPLOAD FINAL", respon);

//         // await delay(5000)
//         // let finalres = await AccountTwitter[keyaccess].PostImgTweets(response.media_id, caption);
//         // return res.json({ message: "success upload images", })
//     } catch (error) {
//         console.log(error);

//         return res.status(400).json({ message: "Failed upload images", data: error })
//     }
// }