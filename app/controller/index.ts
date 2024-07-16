import { Request, Response } from "express";
import TwitterApi from "../utils/TwitterApi";


export const index = (req: Request, res: Response) => {
    return res.json({ message: "Hello World" })
}
export const xLogin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        console.log(username, password);
        const twitter = new TwitterApi()
        const login = await twitter.Login(username, password)
        AccountTwitter[username] = twitter
        return res.json({ message: "success", key: username, reason: login, })
    } catch (error) {
        console.log(error);
        return res.json({ message: "error", reason: error })
    }
}


export const xPostTweet = async (req: Request, res: Response) => {
    try {
        const { username } = req.query as { username: string }
        const { text } = req.body
        let responses = await AccountTwitter[username].CreateTweet(text)
        return res.json({ message: "success", reason: responses })
    } catch (error) {
        return res.json({ message: "error", reason: error })
    }
}

export const xLoginCookies = async (req: Request, res: Response) => {
    try {
        const { username } = req.query as { username: string }
        let twitter = new TwitterApi()
        let cookies = await twitter.LoginCookies(username);
        AccountTwitter[username] = twitter
        return res.json({ message: "success restore", reason: cookies })
    } catch (error) {
        console.log(error);

        return res.json({ message: "error" })
    }
}