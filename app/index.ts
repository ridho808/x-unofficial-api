import express from "express"
import router from "./router"
import fileupload from "express-fileupload"
import { schedule } from "node-cron"
import fs from "fs/promises"

declare global {
    var AccountTwitter: any
}
global.AccountTwitter = {}

const app = express()
const port = 3535
app.use(fileupload())
app.use(express.json())
app.use(router)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

schedule("0 0 */3 * *", () => {
    fs.rm("./app/store", { recursive: true, force: true })
    fs.mkdir("./app/store")
})
// fs.rm("./app/store", { recursive: true, force: true })

fetch("https://x.com/i/api/graphql/AkU-OQxV6M42PwuhB0zKAg/UserMedia?variables=%7B%22userId%22%3A%22998848532%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Afalse%2C%22withClientEventToken%22%3Afalse%2C%22withBirdwatchNotes%22%3Afalse%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
        "content-type": "application/json",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-client-transaction-id": "juCqTIWTCU9ZjrpxJ/9RG1Rj3wSiau7jmyvlvP2tPbur1dgEsAs8+yRx3qRiUtpOI5jqx4zZXCLcwrcwmGto2mUaKyQijQ",
        "x-client-uuid": "76896ed2-47cd-49d5-aa71-06bc063bdef7",
        "x-csrf-token": "2baf9aaceb80addba16a15958919bc0d68fb4042133e305d9eb62b2fce88a86891bfcc750350a1a0944bc820efb2415c0fdcc951a3e346448d3db8ae4d6069e0306d06b8391bb3d91f0ccee265bbae89",
        "x-twitter-active-user": "yes",
        "x-twitter-auth-type": "OAuth2Session",
        "x-twitter-client-language": "en",
        "cookie": "night_mode=2; g_state={\"i_p\":1721245916971,\"i_l\":1}; kdt=PR3qk8ozvN9ewrXQNGsFnpFusnImkFYfc67txkTW; lang=en; dnt=1; guest_id=v1%3A172128111513938066; guest_id_marketing=v1%3A172128111513938066; guest_id_ads=v1%3A172128111513938066; gt=1813810576923283504; auth_token=3b976f5220c7d7adf345d38483809e97b6ff0732; ct0=2baf9aaceb80addba16a15958919bc0d68fb4042133e305d9eb62b2fce88a86891bfcc750350a1a0944bc820efb2415c0fdcc951a3e346448d3db8ae4d6069e0306d06b8391bb3d91f0ccee265bbae89; twid=u%3D1811843743374540800; csrf_id=aadc670422292cdfbfcbc87dfefbbba8; external_referer=padhuUp37zjgzgv1mFWxJ12Ozwit7owX|0|8e8t2xd8A2w%3D; _ga=GA1.2.1694927464.1721283898; _gid=GA1.2.1108254020.1721283898; _ga_KEWZ1G5MB3=GS1.2.1721283898.1.0.1721283898.60.0.0; personalization_id=\"v1_gO7fzbhpp00hjCzzSHC2Tw==\"",
        "Referer": "https://x.com/candulucu/media",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
}).then((data) => {

    // data.json().then(async (value) => {
    //     console.log(value);
    //     await fs.writeFile("./usermedia.json", JSON.stringify(value), "utf-8")
    // })

});