# Unofficial-X/Twitter-API
Welcome to our Unofficial x/Twitter API! Designed with speed, ease of use, and security as top priorities, this API provides fast and reliable access to various services and data you need from the x/Twitter platform. Whether you are an experienced developer or just starting out, this API will facilitate the integration and management of data in your application.EndFragment
# 📁 Collection: Auth 


## End-point: login
### Login Endpoint

This API endpoint is used to authenticate users and obtain access to the system.

#### Request Body

- `username` (string, required): The username of the user.
    
- `password` (string, required): The password of the user.
    
- `email` (string, required): The email address of the user.
    

The request should be sent as an HTTP POST to {{url}}/login with a raw request body type containing the user's `username`, `password`, and `email`.

#### Response

The response of this request is a JSON object with the following properties:

- `message` (string): A message indicating the status of the login attempt.
    
- `keyaccess` (string): A key providing access to the system.
    
- `expired_keyaccess` (string): A key that will expire after a certain period of time.
    

The status code of the response will be 200, and the content type will be `application/json`.

**RESPONSE**

``` json
{
    "message": "success",
    "keyaccess": "f58ce7d9-50db-44c9-99a4-79875a84d4ce",
    "expired_keyaccess": "2024-07-21T13:33:04.939Z"
}

 ```
### Method: POST
>```
>{{url}}/login
>```
### Body (**raw**)

```json
{
    "username" : "username",
    "password" : "password",
    "email" : "email"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: loadsessions
The endpoint makes an HTTP GET request to retrieve a session using the provided key access. The response is in JSON format and includes a message and a key.

**RESPONSE**

``` bash
{
    "message": "success restore session",
    "key": "4ecaa976-a64a-44d8-a236-7ac00510d570"
}

 ```
### Method: GET
>```
>{{url}}/loadsession?keyaccess={{keyaccess}}
>```
### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Tweet 


## End-point: post_tweet
This endpoint allows the user to post a tweet by sending an HTTP POST request to the specified URL with the required access key. The request should include a payload with a "tweet" field.

### Request Body

- tweet (text, required): The content of the tweet.
    

### Response

The response to this request is in the form of a JSON schema with the following properties:

- message (string): A message indicating the result of the request.
    

``` json
{
    "message": "success post tweet",
    "data": {
        "bookmark_count": 0,
        "bookmarked": false,
        "created_at": "Thu Jul 18 13:42:59 +0000 2024",
        "conversation_id_str": "1813932483047727332",
        "display_text_range": [
            0,
            14
        ],
        "entities": {
            "hashtags": [],
            "symbols": [],
            "timestamps": [],
            "urls": [],
            "user_mentions": []
        },
        "favorite_count": 0,
        "favorited": false,
        "full_text": "Type Here okey",
        "is_quote_status": false,
        "lang": "en",
        "quote_count": 0,
        "reply_count": 0,
        "retweet_count": 0,
        "retweeted": false,
        "user_id_str": "1811843743374540800",
        "id_str": "1813932483047727332"
    }
}

 ```
### Method: POST
>```
>{{url}}/posttweet?keyaccess={{keyaccess}}
>```
### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json
{
    "tweet" : "Type Here okey"
}
```

### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: post_images(SOON)
### Method: POST
>```
>{{url}}/uploadphoto?keyaccess={{keyaccess}}
>```
### Headers

|Content-Type|Value|
|---|---|
|||


### Body formdata

|Param|value|Type|
|---|---|---|
|media|/C:/Users/syamr/Downloads/mark.jpg|file|
|caption|heolo|text|


### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: User 


## End-point: get-detail-user
This endpoint makes an HTTP GET request to retrieve user information by username. The request includes a query parameter "keyaccess" for authentication and the "username" parameter to specify the user.

### Request Parameters

- `keyaccess` (query parameter): The access key for authentication.
    
- `username` (query parameter): The username of the user to retrieve information for.
    

### Response

The response will be in JSON format with a status code of 200. It includes various user details such as the user's ability to send direct messages (`can_dm`), ability to be tagged in media (`can_media_tag`), creation date (`created_at`), profile information, follower counts, tweet counts, verification status (`verified`), and other user-specific details.

Example Response:

``` json
{
    "message": "succes get info user",
    "data": {
        "can_dm": false,
        "can_media_tag": true,
        "created_at": "Mon Apr 21 00:28:42 +0000 2014",
        "default_profile": false,
        "default_profile_image": false,
        "description": "X Super Official CEO",
        "entities": {
            "description": {
                "urls": []
            },
            "url": {
                "urls": [
                    {
                        "display_url": "feastables.com",
                        "expanded_url": "https://feastables.com",
                        "url": "https://t.co/aNux1s4HGP",
                        "indices": [
                            0,
                            23
                        ]
                    }
                ]
            }
        },
        "fast_followers_count": 0,
        "favourites_count": 23998,
        "followers_count": 30534860,
        "friends_count": 2002,
        "has_custom_timelines": true,
        "is_translator": false,
        "listed_count": 7564,
        "location": "Follow me for a cookie",
        "media_count": 836,
        "name": "MrBeast",
        "normal_followers_count": 30534860,
        "pinned_tweet_ids_str": [
            "1523674759925760000"
        ],
        "possibly_sensitive": false,
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/2455740283/1601560191",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_normal.jpg",
        "profile_interstitial_type": "",
        "screen_name": "MrBeast",
        "statuses_count": 6768,
        "translator_type": "none",
        "url": "https://t.co/aNux1s4HGP",
        "verified": false,
        "want_retweets": false,
        "withheld_in_countries": [],
        "userid": "2455740283"
    }
}

 ```
### Method: GET
>```
>{{url}}/getinfouser?keyaccess={{keyaccess}}&username=MrBeast
>```
### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|
|username|MrBeast|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get-tweet-user
### GET Tweet User

This endpoint retrieves tweet information for a specific user.

#### Request

- Method: GET
    
- URL: `{{url}}/gettweetuser`
    
- Query Parameters:
    - keyaccess (string, required): The access key for authorization.
        
    - userid (string, required): The ID of the user for whom tweet information is requested.
        

#### Response

The response is in JSON format and follows the schema below:

``` json
{
    "message": "succes get tweet user",
    "data": [
        {
            "tweets": "All my comments on insta are saying I photoshopped this. Nope, Kevin Hart is just short https://t.co/0hCV4f08lq",
            "images": [
                "https://pbs.twimg.com/media/GSu6NqnbEAAcnnC.jpg"
            ],
            "created_at": "Thu Jul 18 01:30:01 +0000 2024"
        },
        {
            "tweets": "As of today all 34,000,000 pounds of trash from TeamSeas has been removed from the ocean and verified by a third party :D\n\nhttps://t.co/SbN0HkyVlJ",
            "created_at": "Tue Jul 16 19:15:06 +0000 2024"
        },
        {
            "tweets": "50 YouTubers\n1 Billion subscribers\n$1,000,00 cash prize\nMy biggest video ever, Go Watch :D https://t.co/09TJLNuRrw",
            "images": [
                "https://pbs.twimg.com/media/GSYRbSAWwAAArzg.jpg",
                "https://pbs.twimg.com/media/GSYRbR4WoAA2Vrt.jpg",
                "https://pbs.twimg.com/media/GSYRbSWWoAA097Q.jpg",
                "https://pbs.twimg.com/media/GSYRbSKWUAAM1o6.jpg"
            ],
            "created_at": "Sat Jul 13 16:00:18 +0000 2024"
        },
        {
            "tweets": "I invited 50 YouTubers to compete for $1,000,000 for their subscribers! Goes live Saturday, my best video yet :) https://t.co/cHKqBCNXdh",
            "images": [
                "https://pbs.twimg.com/amplify_video_thumb/1810721306968518656/img/vTeg9jNxEls_pL5F.jpg"
            ],
            "created_at": "Tue Jul 09 17:03:38 +0000 2024"
        },
        {
            "tweets": "On Kai’s stream https://t.co/HOEZih3yFY",
            "images": [
                "https://pbs.twimg.com/media/GRmhDsaWAAEnaeB.jpg"
            ],
            "created_at": "Thu Jul 04 00:07:33 +0000 2024"
        },
        {
            "tweets": "When we help people (curing 1000 blind people, building 100 houses, 100 wells, etc) people get mad and say I shouldn’t be doing this and governments should. Yes, ideally a YouTuber isn’t the one fixing these issues but I’m not just gonna stand by and do nothing 🤷🏻‍♂️",
            "created_at": "Sun Jun 30 12:54:48 +0000 2024"
        },
        {
            "tweets": "We built 100 homes and gave them away for free! New video is my favorite, give it a watch ❤️ https://t.co/mtllkoVATI",
            "images": [
                "https://pbs.twimg.com/media/GRQLb0lXMAA-LI7.jpg"
            ],
            "created_at": "Sat Jun 29 16:01:19 +0000 2024"
        },
        {
            "tweets": "Feastables launch in Australia 🥰 https://t.co/CMENLgnZHS",
            "images": [
                "https://pbs.twimg.com/amplify_video_thumb/1805852516300533760/img/HVGgcetMcc6WmG9s.jpg"
            ],
            "created_at": "Wed Jun 26 06:36:52 +0000 2024"
        }
    ]
}

 ```

The response includes a `message` field and a `data` array, where each item contains information about the user's tweets, images, and creation date.
### Method: GET
>```
>{{url}}/gettweetuser?keyaccess={{keyaccess}}&userid=2455740283
>```
### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|
|userid|2455740283|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get-media-user
# GET Media User

This endpoint retrieves media information for a specific user.

## Request

### Query Parameters

- `keyaccess` (string, required): The access key for authentication.
    
- `userid` (string, required): The unique identifier of the user.
    

## Response

The response is a JSON object with the following schema:

``` json
{
    "message": "success get media user",
    "data": {
        "next_query": "DAABCgABGSxjaqv___0KAAIZFAtwKdexlAgAAwAAAAIAAA",
        "items": [
            {
                "caption": "All my comments on insta are saying I photoshopped this. Nope, Kevin Hart is just short https://t.co/0hCV4f08lq",
                "created_at": "Thu Jul 18 01:30:01 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/0hcv4f08lq",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GSu6NqnbEAAcnnC.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1813748023614480868/photo/1",
                    "url": "https://t.co/0hCV4f08lq"
                }
            },
            {
                "caption": "New video is my most viewed video ever in 24 hours 😮 https://t.co/QTHMe0QLuy",
                "created_at": "Sun Jul 14 16:26:55 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/qthme0qluy",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GSdhIzgXsAASU5a.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1812524185228320980/photo/1",
                    "url": "https://t.co/QTHMe0QLuy"
                }
            },
            {
                "caption": "50 YouTubers\n1 Billion subscribers\n$1,000,00 cash prize\nMy biggest video ever, Go Watch :D https://t.co/09TJLNuRrw",
                "created_at": "Sat Jul 13 16:00:18 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/09tjlnurrw",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GSYRbSAWwAAArzg.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1812155099373867268/photo/1",
                    "url": "https://t.co/09TJLNuRrw"
                }
            },
            {
                "caption": "This is my 300 subscriber special video from 11 years ago, so crazy to watch it now 🥺 https://t.co/xQ15OWDktn",
                "created_at": "Wed Jul 10 18:33:48 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/xq15owdktn",
                    "type": "video",
                    "media_url_https": "https://pbs.twimg.com/amplify_video_thumb/1811105927208030208/img/4n5xAtFV4mlG3V3B.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1811106563945316862/video/1",
                    "url": "https://t.co/xQ15OWDktn",
                    "original_file": {
                        "content_type": "application/x-mpegURL",
                        "url": "https://video.twimg.com/amplify_video/1811105927208030208/pl/eAHiAjzZ6K6e4JY4.m3u8?tag=16"
                    }
                }
            },
            {
                "caption": "I remember freaking out when I hit 300 subscribers 11 years ago.. lol https://t.co/YJadTd0pZq",
                "created_at": "Wed Jul 10 12:47:18 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/yjadtd0pzq",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GSIIgtVWcAEc_6-.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1811019365514428859/photo/1",
                    "url": "https://t.co/YJadTd0pZq"
                }
            },
            {
                "caption": "I invited 50 YouTubers to compete for $1,000,000 for their subscribers! Goes live Saturday, my best video yet :) https://t.co/cHKqBCNXdh",
                "created_at": "Tue Jul 09 17:03:38 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/chkqbcnxdh",
                    "type": "video",
                    "media_url_https": "https://pbs.twimg.com/amplify_video_thumb/1810721306968518656/img/vTeg9jNxEls_pL5F.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1810721484236591137/video/1",
                    "url": "https://t.co/cHKqBCNXdh",
                    "original_file": {
                        "content_type": "application/x-mpegURL",
                        "url": "https://video.twimg.com/amplify_video/1810721306968518656/pl/0SMaEhR1D8lNjvxl.m3u8?tag=16"
                    }
                }
            },
            {
                "caption": "@KaiCenat https://t.co/GInR9hN75Y",
                "created_at": "Thu Jul 04 19:08:00 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/ginr9hn75y",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GRqmG69WgAAwnpF.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1808940843547701343/photo/1",
                    "url": "https://t.co/GInR9hN75Y"
                }
            },
            {
                "caption": "On Kai’s stream https://t.co/HOEZih3yFY",
                "created_at": "Thu Jul 04 00:07:33 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/hoezih3yfy",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GRmhDsaWAAEnaeB.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1808653840553480411/photo/1",
                    "url": "https://t.co/HOEZih3yFY"
                }
            },
            {
                "caption": "Wow, almost a mil subscribers a day in June. Idk if we’ll ever top this month lol https://t.co/GHgzn0RbfJ",
                "created_at": "Sun Jun 30 12:36:46 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/ghgzn0rbfj",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GRUmNQ7XoAACwtt.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1807392837891231879/photo/1",
                    "url": "https://t.co/GHgzn0RbfJ"
                }
            },
            {
                "caption": "We built 100 homes and gave them away for free! New video is my favorite, give it a watch ❤️ https://t.co/mtllkoVATI",
                "created_at": "Sat Jun 29 16:01:19 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/mtllkovati",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GRQLb0lXMAA-LI7.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1807081926848655764/photo/1",
                    "url": "https://t.co/mtllkoVATI"
                }
            }
        ]
    }
}

 ```

The `message` field contains a string message, and the `data` field contains an object with `next_query` and `items` properties. Each item in the `items` array contains information about the media, including `caption`, `created_at`, and `media` object with details such as `display_url`, `type`, `media_url_https`, `extended_url`, and `url`.
### Method: GET
>```
>{{url}}/getmediauser?keyaccess={{keyaccess}}&userid=2455740283
>```
### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|
|userid|2455740283|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get-media-user-next
### GET Media User

This endpoint retrieves media information for a specific user.

#### Request

- Method: GET
    
- URL: `{{url}}/getmediauser`
    
- Query Parameters:
    
    - `keyaccess` (string, required): The access key for the request.
        
    - `userid` (string, required): The ID of the user for whom the media information is requested.
        
    - `next` (string, required): A token for fetching the next set of media items.
        

#### Response

The response is in JSON format and follows the schema below:

``` json
{
    "message": "success get media user",
    "data": {
        "next_query": "DAABCgABGSxjaqv___oKAAIY8G6nxFehuQgAAwAAAAIAAA",
        "items": [
            {
                "caption": "Feastables launch in Australia 🥰 https://t.co/CMENLgnZHS",
                "created_at": "Wed Jun 26 06:36:52 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/cmenlgnzhs",
                    "type": "video",
                    "media_url_https": "https://pbs.twimg.com/amplify_video_thumb/1805852516300533760/img/HVGgcetMcc6WmG9s.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1805852713298653650/video/1",
                    "url": "https://t.co/CMENLgnZHS",
                    "original_file": {
                        "content_type": "application/x-mpegURL",
                        "url": "https://video.twimg.com/amplify_video/1805852516300533760/pl/9A311XOFCPL9DWxQ.m3u8?tag=16"
                    }
                }
            },
            {
                "caption": "Feastables is now available in every Woolworths in Australia!! And 10 people that buy Feastables in the next 3 days will win a car/compete in a video I’m filming in Sydney! Can’t wait to meet some of you 🇦🇺 https://t.co/JoGszFoLj0",
                "created_at": "Sun Jun 23 02:16:20 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/jogszfolj0",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GQuVD-ma8AAJekR.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1804699985570615301/photo/1",
                    "url": "https://t.co/JoGszFoLj0"
                }
            },
            {
                "caption": "Just uploaded the most insane video we’ve ever done.. go watch! https://t.co/H1tJG4PhCm",
                "created_at": "Sat Jun 15 16:03:08 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/h1tjg4phcm",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GQIFlqCbAAEn-vX.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1802008951946727605/photo/1",
                    "url": "https://t.co/H1tJG4PhCm"
                }
            },
            {
                "caption": "I don’t think a YouTube channel has ever gained over 20,000,000 subscribers in a month before 😮 https://t.co/kFLtUJBj1T",
                "created_at": "Thu Jun 13 17:11:07 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/kfltujbj1t",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GP-B-JDbEAACP-c.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1801301285788168379/photo/1",
                    "url": "https://t.co/kFLtUJBj1T"
                }
            },
            {
                "caption": "I Buried Myself Alive For A Week! Enjoy watching me suffer https://t.co/L97Rrlueqa",
                "created_at": "Fri Jun 07 00:33:45 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/l97rrlueqa",
                    "type": "video",
                    "media_url_https": "https://pbs.twimg.com/media/GPZX9hGbQAA1M9F.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1798875962920362270/video/1",
                    "url": "https://t.co/L97Rrlueqa",
                    "original_file": {
                        "content_type": "application/x-mpegURL",
                        "url": "https://video.twimg.com/amplify_video/1798719338733862912/pl/gWIVRsKtnMo_kPxk.m3u8?tag=16&v=c88"
                    }
                }
            },
            {
                "caption": "Just filmed our biggest video ever.. https://t.co/uWETt7HGBb",
                "created_at": "Wed Jun 05 21:22:48 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/uwett7hgbb",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GPVuinxWwAAu8eO.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1798465522008252438/photo/1",
                    "url": "https://t.co/uWETt7HGBb"
                }
            },
            {
                "caption": "Yesterday was the most subscribers we’ve ever gotten in a day 😮 https://t.co/FPSxsvql8l",
                "created_at": "Sun Jun 02 13:18:46 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/fpsxsvql8l",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GPEjTddXcAETcUt.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1797256546541289682/photo/1",
                    "url": "https://t.co/FPSxsvql8l"
                }
            },
            {
                "caption": "After 6 years we have finally avenged Pewdiepie 🥹 https://t.co/V1znbyqw27",
                "created_at": "Sun Jun 02 00:09:30 +0000 2024",
                "media": {
                    "display_url": "pic.x.com/v1znbyqw27",
                    "type": "photo",
                    "media_url_https": "https://pbs.twimg.com/media/GPBupspWIAA265a.jpg",
                    "extended_url": "https://twitter.com/MrBeast/status/1797057918153499065/photo/1",
                    "url": "https://t.co/V1znbyqw27"
                }
            }
        ]
    }
}

 ```

- `message` (string): A message related to the response.
    
- `data` (object): The main data object containing the media information.
    
    - `next_query` (string): Token for fetching the next set of media items.
        
    - `items` (array): An array of media items.
        
        - `caption` (string): The caption of the media item.
            
        - `created_at` (string): The creation timestamp of the media item.
            
        - `media` (object): Details of the media item.
            
            - `display_url` (string): The display URL of the media.
                
            - `type` (string): The type of media.
                
            - `media_url_https` (string): The HTTPS URL of the media.
                
            - `extended_url` (string): The extended URL of the media.
                
            - `url` (string): The URL of the media.
                
            - `original_file` (object): Details of the original file.
                
                - `content_type` (string): The content type of the original file.
                    
                - `url` (string): The URL of the original file.
### Method: GET
>```
>{{url}}/getmediauser?keyaccess={{keyaccess}}&userid=2455740283&next=DAABCgABGSxjaqv___0KAAIZFAtwKdexlAgAAwAAAAIAAA
>```
### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|
|userid|2455740283|
|next|DAABCgABGSxjaqv___0KAAIZFAtwKdexlAgAAwAAAAIAAA|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Trens 


## End-point: get-location
This endpoint makes an HTTP GET request to retrieve the location information for a specific key access in Japan.

### Response

The response is in JSON format and has a status code of 200. The response body follows the schema below:

``` json
{
    "message": "success",
    "data": {
        "place_id": "499763682993518708",
        "name": "Japan",
        "location_type": "Country"
    }
}

 ```
### Method: GET
>```
>{{url}}/getlocation?keyaccess={{keyaccess}}&location=Japan
>```
### Body (**raw**)

```json
{
    "location" : "japan"
}
```

### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|
|location|Japan|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: get-trends

The API returns a JSON response with a status code of 200 and a content type of application/json. The response body follows the schema below:

```json
{
  "message": "",
  "data": {
    "location": "",
    "entryId": "",
    "items": [
      {
        "entryId": "",
        "item": {
          "itemContent": {
            "itemType": "",
            "__typename": "",
            "associated_cards": [],
            "grouped_trends": [
              {
                "name": "",
                "url": {
                  "url": "",
                  "urlType": "",
                  "urtEndpointOptions": {
                    "requestParams": [
                      {
                        "key": "",
                        "value": ""
                      }
                    ]
                  }
                }
              }
            ],
            "name": "",
            "trend_url": {
              "url": "",
              "urlType": "",
              "urtEndpointOptions": {
                "requestParams": [
                  {
                    "key": "",
                    "value": ""
                  }
                ]
              }
            },
            "trend_metadata": {
              "domain_context": "",
              "url": {
                "url": "",
                "urlType": "",
                "urtEndpointOptions": {
                  "requestParams": [
                    {
                      "key": "",
                      "value": ""
                    }
                  ]
                }
              }
            }
          },
          "feedbackInfo": {
            "clientEventInfo": {
              "action": "",
              "component": "",
              "element": ""
            },
            "feedbackKeys": [""],
            "feedbackMetadata": ""
          },
          "clientEventInfo": {
            "component": "",
            "element": "",
            "details": {
              "guideDetails": {
                "identifier": "",
                "token": "",
                "transparentGuideDetails": {
                  "type": "",
                  "impressionId": "",
                  "impressionToken": "",
                  "position": 0,
                  "trendName": "",
                  "relatedTerms": [""],
                  "clusterId": ""
                }
              }
            }
          }
        }
      }
    ]
  }
}
```

### Method: GET
>```
>{{url}}/gettrends?keyaccess={{keyaccess}}&location=Japan
>```
### Body (**raw**)

```json

```

### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|
|location|Japan|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: SearchUsers 


## End-point: search-user
### GET /searchuser

#### Description

This endpoint retrieves user information based on the provided username.

#### Request

- Query Parameters
    
    - keyaccess (string, required): The access key for authentication.
        
    - username (string, required): The username of the user to search.
        

#### Response

The response is in JSON format and follows the schema below:

``` json
{
    "message": "success search people",
    "data": [
        {
            "userid": "20749410",
            "username": "finkd",
            "name": "Mark Zuckerberg",
            "blue_verified": true,
            "can_dm": false,
            "description": "",
            "favorite": 0,
            "followers": 766628,
            "following": 747,
            "location": "",
            "profile": "https://pbs.twimg.com/profile_images/77846223/profile_normal.jpg",
            "verified": false
        },
        {
            "userid": "1521176912407973889",
            "username": "MarkCrtlC",
            "name": "Mark Zuckerberg (Parody)",
            "blue_verified": true,
            "can_dm": true,
            "description": "(Ctrl-C + Ctrl-V) make the world a better place (Parody) | MeMe • Crypto | Subscribe with $1 to help me buy 𝕏",
            "favorite": 5113,
            "followers": 471926,
            "following": 334,
            "location": "Metaverse",
            "profile": "https://pbs.twimg.com/profile_images/1679104980467462144/R9oQfPvg_normal.jpg",
            "verified": false
        },
        {
            "userid": "983662678567727104",
            "username": "ZuckerbergMemes",
            "name": "Mark Zuckerberg Memes",
            "blue_verified": false,
            "can_dm": true,
            "description": "Mark Zuckerberg Memes: the best memes on the Zuck | #ZuckerbergMemes | Not affiliated with Facebook or Mark #Zuckerberg | #markzuckerberg | ➡️ @ComedyPear",
            "favorite": 373,
            "followers": 57091,
            "following": 40,
            "location": "Parody Account",
            "profile": "https://pbs.twimg.com/profile_images/993836730926190592/A42qWqNG_normal.jpg",
            "verified": false
        },
        {
            "userid": "1688720993815003137",
            "username": "MarkZuckss",
            "name": "Mark Zuckerberg - Parody",
            "blue_verified": true,
            "can_dm": false,
            "description": "X won't survive against Threads. Kidnapper of ideas. A legend in my own mind. Parody. The greatest thief since Jesse James. Pronouns are copy/steal.",
            "favorite": 185108,
            "followers": 25980,
            "following": 1135,
            "location": "",
            "profile": "https://pbs.twimg.com/profile_images/1688721379263201280/IhxtmUIt_normal.jpg",
            "verified": false
        },
        {
            "userid": "149027636",
            "username": "notzuckerberg",
            "name": "Not Mark Zuckerberg",
            "blue_verified": false,
            "can_dm": false,
            "description": "My story is everyone's story: boy meets girl, boy loses girl, boy makes social network, girl and 1 billion others join social network. [Run by @afterthatsummer]",
            "favorite": 0,
            "followers": 30745,
            "following": 5,
            "location": "Palo Alto, CA",
            "profile": "https://pbs.twimg.com/profile_images/937374385/Mark_Zuckerberg_szykuja_3268108_normal.jpg",
            "verified": false
        },
        {
            "userid": "1480832909489565699",
            "username": "MorkZuckerburg",
            "name": "Mark Zuckerberg",
            "blue_verified": false,
            "can_dm": false,
            "description": "Making the world a worse place with Facebook. Founder & CEO. Parody account",
            "favorite": 52,
            "followers": 1510,
            "following": 437,
            "location": "Menlo Park, CA",
            "profile": "https://pbs.twimg.com/profile_images/1482617034827464704/Hwp0gwV6_normal.jpg",
            "verified": false
        },
        {
            "userid": "1662489617055223808",
            "username": "MarkZucker_",
            "name": "Mark Zuckerberg (Parody)",
            "blue_verified": false,
            "can_dm": true,
            "description": "The Zuck (Parody)",
            "favorite": 1508,
            "followers": 21839,
            "following": 13,
            "location": "Meta Headquarters ",
            "profile": "https://pbs.twimg.com/profile_images/1678105328968421381/iycV2Wa5_normal.jpg",
            "verified": false
        },
        {
            "userid": "1507140114065117184",
            "username": "ballluver3",
            "name": "Mark Zuckerberg",
            "blue_verified": false,
            "can_dm": false,
            "description": "FOLLOW the account on my banner",
            "favorite": 49,
            "followers": 480,
            "following": 27,
            "location": "Zimbabwe ",
            "profile": "https://pbs.twimg.com/profile_images/1683963359798890497/RvjaxS29_normal.jpg",
            "verified": false
        },
        {
            "userid": "1679668470743547905",
            "username": "MarkZuckrbrg",
            "name": "Not Mark Zuckerberg",
            "blue_verified": false,
            "can_dm": true,
            "description": "Not Mark Zuckerberg. Not a parody account. Posting whatever the fuck I want.",
            "favorite": 329,
            "followers": 1912,
            "following": 139,
            "location": "Metaverse",
            "profile": "https://pbs.twimg.com/profile_images/1679840073389416450/iltboRXC_normal.jpg",
            "verified": false
        },
        {
            "userid": "1731770248167133184",
            "username": "zuckerberg5143",
            "name": "Mark Zuckerberg",
            "blue_verified": false,
            "can_dm": true,
            "description": "I’m mark Zuckerberg the CEO and founder of Meta",
            "favorite": 77,
            "followers": 1005,
            "following": 2332,
            "location": "California, PA",
            "profile": "https://pbs.twimg.com/profile_images/1768020384702427137/89BTWIxa_normal.jpg",
            "verified": false
        },
        {
            "userid": "1431008867685634048",
            "username": "Mark_Zuck_CEO",
            "name": "Mark Zuckerberg (Parody)",
            "blue_verified": false,
            "can_dm": false,
            "description": "",
            "favorite": 19643,
            "followers": 7837,
            "following": 575,
            "location": "",
            "profile": "https://pbs.twimg.com/profile_images/1709632806026960896/lZ7IpETk_normal.jpg",
            "verified": false
        },
        {
            "userid": "1691796825185959936",
            "username": "mark_zucker_",
            "name": "Mark Zuckerberg (Parody)",
            "blue_verified": false,
            "can_dm": false,
            "description": "META is the future.\n\n-This is a parody site with tons of funny posts about our favorite lizard boy. 🦎",
            "favorite": 843,
            "followers": 807,
            "following": 43,
            "location": "META",
            "profile": "https://pbs.twimg.com/profile_images/1691797287628918784/B50kKnQR_normal.jpg",
            "verified": false
        },
        {
            "userid": "1633548802413199360",
            "username": "MarkZukerbeg01",
            "name": "Mark Zuckerberg 2.0",
            "blue_verified": false,
            "can_dm": false,
            "description": "Alhamdulillah For Everything",
            "favorite": 724,
            "followers": 3340,
            "following": 540,
            "location": "Dhaka, Bangladesh",
            "profile": "https://pbs.twimg.com/profile_images/1712135727398711296/-sbq6fc5_normal.jpg",
            "verified": false
        },
        {
            "userid": "73045029",
            "username": "_markmomoh",
            "name": "Mark Zuckerberg NG",
            "blue_verified": false,
            "can_dm": false,
            "description": "Follow me up to 1k followers 🥰🥰",
            "favorite": 431,
            "followers": 346,
            "following": 15,
            "location": "Nigeria",
            "profile": "https://pbs.twimg.com/profile_images/1775703856434835456/arpXMKbQ_normal.jpg",
            "verified": false
        },
        {
            "userid": "1710384041105432576",
            "username": "zuckrbgParody",
            "name": "Mark Zuckerberg (Parody)",
            "blue_verified": false,
            "can_dm": false,
            "description": "CEO of Facebook",
            "favorite": 435,
            "followers": 1365,
            "following": 1901,
            "location": "Metaverse",
            "profile": "https://pbs.twimg.com/profile_images/1716457215538700288/rC1KA9Ne_normal.jpg",
            "verified": false
        },
        {
            "userid": "3145080763",
            "username": "VINETTRIA",
            "name": "V",
            "blue_verified": false,
            "can_dm": false,
            "description": "mark zuckerberg’s ex wife",
            "favorite": 12489,
            "followers": 186079,
            "following": 248,
            "location": "",
            "profile": "https://pbs.twimg.com/profile_images/1782586337356328961/9e1NGqs7_normal.jpg",
            "verified": false
        },
        {
            "userid": "3081470948",
            "username": "maureeeeEEEEEE",
            "name": "OFFICIAL MARK ZUCKERBERG HATE ACCOUNT",
            "blue_verified": false,
            "can_dm": false,
            "description": "i have a big pp",
            "favorite": 3031,
            "followers": 234,
            "following": 39,
            "location": "",
            "profile": "https://pbs.twimg.com/profile_images/1333260206667563009/NMoeBY8s_normal.jpg",
            "verified": false
        },
        {
            "userid": "799457226",
            "username": "PlaidZuckerberg",
            "name": "Plaid Zuckerberg",
            "blue_verified": false,
            "can_dm": false,
            "description": "The Plaid Avenger's updates for Facebook CEO Mark Zuckerberg. (Parody account) (Fake!!)",
            "favorite": 37,
            "followers": 7496,
            "following": 74,
            "location": "Palo Alto, California (not)",
            "profile": "https://pbs.twimg.com/profile_images/2571423728/rsy6dvkpos8ai6yrvdxi_normal.png",
            "verified": false
        },
        {
            "userid": "1375136927083593734",
            "username": "aroundtfur",
            "name": "mark zuckerberg",
            "blue_verified": false,
            "can_dm": false,
            "description": "",
            "favorite": 1088,
            "followers": 549,
            "following": 551,
            "location": "",
            "profile": "https://pbs.twimg.com/profile_images/1511452031126450177/KdqmhcL4_normal.jpg",
            "verified": false
        },
        {
            "userid": "1643924320249577472",
            "username": "mzceobsc",
            "name": "Mark Zuckerberg CEO",
            "blue_verified": false,
            "can_dm": false,
            "description": "inspried by Elon CEO - NEXT 100x MEME token on BSC\nhttps://t.co/1qZu4DHZaN…",
            "favorite": 8,
            "followers": 485,
            "following": 4,
            "location": "",
            "profile": "https://pbs.twimg.com/profile_images/1646771685897703425/smPo8e2u_normal.jpg",
            "verified": false
        }
    ]
}

 ```
### Method: GET
>```
>{{url}}/searchuser?keyaccess={{keyaccess}}&username=MarkZuckerberg
>```
### Query Params

|Param|value|
|---|---|
|keyaccess|{{keyaccess}}|
|username|MarkZuckerberg|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
