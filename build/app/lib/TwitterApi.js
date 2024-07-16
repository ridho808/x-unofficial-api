"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
class TwitterApi {
    constructor() {
        this.UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";
        this.PublicToken = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA";
        this.sSecChUa = '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"';
        this.sSecChUaPlatform = "macOS";
        this.session = axios_1.default.create();
        this.method_check_bypass = false;
        this.flow_token = null;
        this.language = "en";
        this.cookie = null;
        this.ct0 = null;
        this.content = null;
    }
    async get_guest_token() {
        try {
            let headers = {
                'authorization': this.PublicToken,
                'User-Agent': this.UserAgent,
                'Sec-Ch-Ua': this.sSecChUa,
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': this.sSecChUaPlatform,
                'Accept-Language': 'en-US,en;q=0.9',
            };
            const responses = await this.session.post('https://api.twitter.com/1.1/guest/activate.json', {}, {
                headers
            });
            return responses.data.guest_token;
        }
        catch (error) {
            console.log(error);
            throw new Error('Guest Token retrival failed');
        }
    }
    async get_headers() {
        let headers = {
            'authorization': this.PublicToken,
            'User-Agent': this.UserAgent,
            'Sec-Ch-Ua': this.sSecChUa,
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': this.sSecChUaPlatform,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'Content-type': 'application/json',
            'x-guest-token': await this.get_guest_token(),
            'x-csrf-token': this.ct0,
            'x-twitter-active-user': 'yes',
            'Cookie': this.cookie,
            'Accept-Language': 'en-US,en;q=0.9',
        };
        return headers;
    }
    async error_check(content) {
        if (content && content.errors) {
            throw new Error(content.errors[0].message);
        }
    }
    async method_check(method_name) {
        if (this.method_check_bypass) {
            return;
        }
        const subtaskIds = this.get_subtask_ids();
        if (!subtaskIds.includes(method_name)) {
            console.log(this.get_subtask_ids());
        }
    }
    get_subtask_ids() {
        return this.content?.subtasks?.map((subtask) => subtask.subtask_id) || [];
    }
    async flow_token_check() {
        if (!this.flow_token) {
            throw new Error('Token not found');
        }
    }
    async twitter() {
        return this.session.get("https://twitter.com/")
            .then(() => this)
            .catch(() => Promise.reject(this.error_check()));
    }
    async login_flow() {
        const data = JSON.stringify({
            "input_flow_data": {
                "flow_context": {
                    "debug_overrides": {},
                    "start_location": {
                        "location": "manual_link"
                    }
                }
            },
            "subtask_versions": {
                "action_list": 2,
                "alert_dialog": 1,
                "app_download_cta": 1,
                "check_logged_in_account": 1,
                "choice_selection": 3,
                "contacts_live_sync_permission_prompt": 0,
                "cta": 7,
                "email_verification": 2,
                "end_flow": 1,
                "enter_date": 1,
                "enter_email": 2,
                "enter_password": 5,
                "enter_phone": 2,
                "enter_recaptcha": 1,
                "enter_text": 5,
                "enter_username": 2,
                "generic_urt": 3,
                "in_app_notification": 1,
                "interest_picker": 3,
                "js_instrumentation": 1,
                "menu_dialog": 1,
                "notifications_permission_prompt": 2,
                "open_account": 2,
                "open_home_timeline": 1,
                "open_link": 1,
                "phone_verification": 4,
                "privacy_options": 1,
                "security_key": 3,
                "select_avatar": 4,
                "select_banner": 2,
                "settings_list": 7,
                "show_code": 1,
                "sign_up": 2,
                "sign_up_review": 4,
                "tweet_selection_urt": 1,
                "update_users": 1,
                "upload_media": 1,
                "user_recommendations_list": 4,
                "user_recommendations_urt": 1,
                "wait_spinner": 3,
                "web_modal": 1
            }
        });
        const params = { flow_name: 'login' };
        return this.session.post('https://api.twitter.com/1.1/onboarding/task.json', data, {
            headers: await this.get_headers(),
            params,
        })
            .then((response) => {
            this.error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
            return this;
        })
            .catch((err) => Promise.reject(err));
    }
    async LoginJsInstrumentationSubtask() {
        console.log('LoginJsInstrumentationSubtask');
        await this.flow_token_check();
        await this.method_check('LoginJsInstrumentationSubtask');
        const data = JSON.stringify({
            "flow_token": this.flow_token,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginJsInstrumentationSubtask",
                    "js_instrumentation": {
                        "response": JSON.stringify({
                        // Add your response data here
                        }),
                        "link": "next_link",
                    },
                }
            ],
        });
        return this.session.post('https://api.twitter.com/1.1/onboarding/task.json', data, {
            headers: await this.get_headers(),
        }).then(async (response) => {
            console.log(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            await this.error_check();
            return this;
        }).catch((err) => Promise.reject(err));
    }
    async LoginEnterUserIdentifierSSO(userid) {
        await this.flow_token_check();
        await this.method_check("LoginEnterUserIdentifierSSO");
        const data = JSON.stringify({
            "flow_token": this.flow_token,
            "subtask_inputs": [
                {
                    "subtask_id": "LoginEnterUserIdentifierSSO",
                    "settings_list": {
                        "setting_responses": [
                            {
                                "key": "user_identifier",
                                "response_data": { "text_data": { "result": userid } },
                            }
                        ],
                        "link": "next_link",
                    },
                }
            ],
        });
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.get_headers(),
            });
            await this.error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async AccountDuplicationCheck() {
        await this.flow_token_check();
        await this.method_check('AccountDuplicationCheck');
        const data = {
            "flow_token": this.flow_token,
            "subtask_inputs": [
                {
                    "check_logged_in_account": {
                        "link": "AccountDuplicationCheck_false"
                    },
                    "subtask_id": "AccountDuplicationCheck"
                }
            ]
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.get_headers(),
            });
            await this.error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async LoginEnterPassword(password) {
        await this.flow_token_check();
        await this.method_check('LoginEnterPassword');
        const data = {
            flow_token: this.flow_token,
            subtask_inputs: [
                {
                    subtask_id: 'LoginEnterPassword',
                    enter_password: { password: password, link: 'next_link' },
                },
            ],
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.get_headers(),
            });
            await this.error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async successExit() {
        await this.flow_token_check();
        await this.method_check('SuccessExit');
        const data = {
            flow_token: this.flow_token,
            subtask_inputs: [
                {
                    subtask_id: 'SuccessExit',
                    open_link: {
                        link: {
                            link_type: 'subtask',
                            link_id: 'next_link',
                            subtask_id: 'LoginOpenHomeTimeline'
                        }
                    }
                },
            ],
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.get_headers(),
            });
            await this.error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            if (response.headers['set-cookie']) {
                const ct0Regex = /ct0=([^;]+)/;
                for (const cookieItem of response.headers['set-cookie']) {
                    if (typeof cookieItem === 'string') {
                        const ct0Match = cookieItem.match(ct0Regex);
                        if (ct0Match) {
                            this.ct0 = ct0Match[1];
                            this.cookie = response.headers['set-cookie'] ? response.headers['set-cookie'].join('; ') : null;
                        }
                    }
                }
            }
            return this;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async LoginEnterAlternateIdentifierSubtask(text) {
        await this.flow_token_check();
        await this.method_check('LoginEnterAlternateIdentifierSubtask');
        const data = {
            flow_token: this.flow_token,
            subtask_inputs: [
                {
                    subtask_id: 'LoginEnterAlternateIdentifierSubtask',
                    enter_text: { text: text, link: 'next_link' },
                },
            ],
        };
        try {
            const response = await this.session.post('https://twitter.com/i/api/1.1/onboarding/task.json', data, {
                headers: await this.get_headers(),
            });
            await this.error_check(response.data);
            this.flow_token = response.data.flow_token;
            this.content = response.data;
            return this;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async GetLocationTrends(location) {
        try {
            const response = await this.session.get(`https://x.com/i/api/2/guide/explore_locations_with_auto_complete.json?prefix=${location}`, {
                headers: await this.get_headers(),
            });
            let { data } = response;
            const indonesiaObject = data.find((place) => place.name.toLowerCase() === location.toLowerCase());
            return indonesiaObject;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async SetTrendsLocation(id) {
        try {
            const response = await this.session.post(`https://x.com/i/api/2/guide/set_explore_settings.json`, JSON.stringify({
                places: id
            }), {
                headers: await this.get_headers(),
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async getTrends() {
        try {
            const param = {
                variables: '{"cursor":""}',
                features: JSON.stringify({
                    rweb_tipjar_consumption_enabled: true,
                    responsive_web_graphql_exclude_directive_enabled: true,
                    verified_phone_label_enabled: false,
                    responsive_web_graphql_timeline_navigation_enabled: true,
                    responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
                    creator_subscriptions_tweet_preview_api_enabled: true,
                    communities_web_enable_tweet_community_results_fetch: true,
                    c9s_tweet_anatomy_moderator_badge_enabled: true,
                    articles_preview_enabled: true,
                    tweetypie_unmention_optimization_enabled: true,
                    responsive_web_edit_tweet_api_enabled: true,
                    graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
                    view_counts_everywhere_api_enabled: true,
                    longform_notetweets_consumption_enabled: true,
                    responsive_web_twitter_article_tweet_consumption_enabled: true,
                    tweet_awards_web_tipping_enabled: false,
                    creator_subscriptions_quote_tweet_preview_enabled: false,
                    freedom_of_speech_not_reach_fetch_enabled: true,
                    standardized_nudges_misinfo: true,
                    tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
                    rweb_video_timestamps_enabled: true,
                    longform_notetweets_rich_text_read_enabled: true,
                    longform_notetweets_inline_media_enabled: true,
                    responsive_web_enhance_cards_enabled: false
                })
            };
            const response = await this.session.get(`https://x.com/i/api/graphql/5Idy0EJFuBTl3PR_T_HYOQ/ExplorePage`, {
                params: param,
                headers: await this.get_headers(),
            });
            return response.data;
        }
        catch (error) {
            console.log(error.response.data);
            return Promise.reject(error);
        }
    }
    async CreateTweet(text) {
        try {
            let data = JSON.stringify({
                "features": {
                    "articles_preview_enabled": true,
                    "c9s_tweet_anatomy_moderator_badge_enabled": true,
                    "communities_web_enable_tweet_community_results_fetch": true,
                    "creator_subscriptions_quote_tweet_preview_enabled": false,
                    "freedom_of_speech_not_reach_fetch_enabled": true,
                    "graphql_is_translatable_rweb_tweet_is_translatable_enabled": true,
                    "longform_notetweets_consumption_enabled": true,
                    "longform_notetweets_inline_media_enabled": true,
                    "longform_notetweets_rich_text_read_enabled": true,
                    "responsive_web_edit_tweet_api_enabled": true,
                    "responsive_web_enhance_cards_enabled": false,
                    "responsive_web_graphql_exclude_directive_enabled": true,
                    "responsive_web_graphql_skip_user_profile_image_extensions_enabled": false,
                    "responsive_web_graphql_timeline_navigation_enabled": true,
                    "responsive_web_twitter_article_tweet_consumption_enabled": true,
                    "rweb_tipjar_consumption_enabled": true,
                    "rweb_video_timestamps_enabled": true,
                    "standardized_nudges_misinfo": true,
                    "tweet_awards_web_tipping_enabled": false,
                    "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": true,
                    "tweetypie_unmention_optimization_enabled": true,
                    "verified_phone_label_enabled": false,
                    "view_counts_everywhere_api_enabled": true
                },
                "queryId": "oB-5XsHNAbjvARJEc8CZFw",
                "variables": {
                    "dark_request": false,
                    "media": {
                        "media_entities": [],
                        "possibly_sensitive": false
                    },
                    "semantic_annotation_ids": [],
                    "tweet_text": text
                }
            });
            const response = await this.session.post('https://x.com/i/api/graphql/oB-5XsHNAbjvARJEc8CZFw/CreateTweet', data, {
                headers: await this.get_headers(),
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    async Login(username, password, email, key) {
        try {
            console.log("Login ======== > ", username, password);
            await this.login_flow();
            let Username = username;
            let Password = password;
            let login = false;
            while (!login) {
                console.log(this.get_subtask_ids());
                if (this.get_subtask_ids().includes('LoginJsInstrumentationSubtask')) {
                    await this.LoginJsInstrumentationSubtask();
                }
                else if (this.get_subtask_ids().includes('LoginEnterUserIdentifierSSO')) {
                    await this.LoginEnterUserIdentifierSSO(Username);
                }
                else if (this.get_subtask_ids().includes('LoginEnterPassword')) {
                    await this.LoginEnterPassword(Password);
                }
                else if (this.get_subtask_ids().includes('AccountDuplicationCheck')) {
                    await this.AccountDuplicationCheck();
                    fs_1.default.writeFileSync(`./app/store/${key}.json`, JSON.stringify({ username: username, data: await this.get_headers() }), "utf-8");
                }
                else if (this.get_subtask_ids().includes('LoginEnterAlternateIdentifierSubtask')) {
                    let substask = await this.LoginEnterAlternateIdentifierSubtask(email);
                    fs_1.default.writeFileSync(`./app/store${key}.json`, JSON.stringify({ username: username, data: await this.get_headers() }), "utf-8");
                    console.log(substask.get_subtask_ids());
                }
                else if (this.get_subtask_ids().includes('SuccessExit')) {
                    login = true;
                    break;
                }
            }
            return { data: this.cookie, message: "SUCCESS LOGIN AS " + username };
        }
        catch (error) {
            return Promise.reject({ data: null, message: "FAILED LOGIN AS " + username + " " });
        }
    }
    async LoginCookies(keys) {
        try {
            let ReadFile = fs_1.default.readFileSync(`./app/store/${keys}.json`, "utf-8");
            let { data } = JSON.parse(ReadFile);
            this.PublicToken = data.authorization;
            this.UserAgent = data['User-Agent'];
            this.sSecChUa = data["Sec-Ch-Ua"];
            this.sSecChUaPlatform = data["Sec-Ch-Ua-Platform"];
            this.ct0 = data["x-csrf-token"];
            this.cookie = data["Cookie"];
            await this.get_headers();
            return this;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    async getInfoUsers(username) {
        const response = await this.session.get(`https://x.com/i/api/graphql/xmU6X_CKVnQ5lSrCbAmJsg/UserByScreenName?variables=%7B%22screen_name%22%3A%22${username}%22%2C%22withSafetyModeUserFields%22%3Atrue%7D&features=%7B%22hidden_profile_subscriptions_enabled%22%3Atrue%2C%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22subscriptions_verification_info_is_identity_verified_enabled%22%3Atrue%2C%22subscriptions_verification_info_verified_since_enabled%22%3Atrue%2C%22highlights_tweets_tab_ui_enabled%22%3Atrue%2C%22responsive_web_twitter_article_notes_tab_enabled%22%3Atrue%2C%22subscriptions_feature_can_gift_premium%22%3Atrue%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D&fieldToggles=%7B%22withAuxiliaryUserLabels%22%3Afalse%7D`, {
            headers: await this.get_headers(),
        });
        return response.data;
    }
    async GetTweetUser(userid) {
        const params = {
            variables: JSON.stringify({
                userId: userid,
                count: 10,
                includePromotedContent: true,
                withQuickPromoteEligibilityTweetFields: true,
                withVoice: true,
                withV2Timeline: true
            }),
            features: JSON.stringify({
                rweb_tipjar_consumption_enabled: true,
                responsive_web_graphql_exclude_directive_enabled: true,
                verified_phone_label_enabled: false,
                creator_subscriptions_tweet_preview_api_enabled: true,
                responsive_web_graphql_timeline_navigation_enabled: true,
                responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
                communities_web_enable_tweet_community_results_fetch: true,
                c9s_tweet_anatomy_moderator_badge_enabled: true,
                articles_preview_enabled: true,
                tweetypie_unmention_optimization_enabled: true,
                responsive_web_edit_tweet_api_enabled: true,
                graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
                view_counts_everywhere_api_enabled: true,
                longform_notetweets_consumption_enabled: true,
                responsive_web_twitter_article_tweet_consumption_enabled: true,
                tweet_awards_web_tipping_enabled: false,
                creator_subscriptions_quote_tweet_preview_enabled: false,
                freedom_of_speech_not_reach_fetch_enabled: true,
                standardized_nudges_misinfo: true,
                tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
                rweb_video_timestamps_enabled: true,
                longform_notetweets_rich_text_read_enabled: true,
                longform_notetweets_inline_media_enabled: true,
                responsive_web_enhance_cards_enabled: false
            }),
            fieldToggles: JSON.stringify({
                withArticlePlainText: false
            })
        };
        try {
            console.log("get tweets");
            const response = await this.session.get(`https://x.com/i/api/graphql/-oADiDXCeko8ztc6Vvth5Q/UserTweets`, {
                headers: await this.get_headers(),
                params: params
            });
            return response.data.data.user;
        }
        catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async SearchUser(username) {
        const params = {
            variables: JSON.stringify({
                rawQuery: username,
                count: 20,
                querySource: "typed_query",
                product: "People"
            }),
            features: JSON.stringify({
                rweb_tipjar_consumption_enabled: true,
                responsive_web_graphql_exclude_directive_enabled: true,
                verified_phone_label_enabled: false,
                creator_subscriptions_tweet_preview_api_enabled: true,
                responsive_web_graphql_timeline_navigation_enabled: true,
                responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
                communities_web_enable_tweet_community_results_fetch: true,
                c9s_tweet_anatomy_moderator_badge_enabled: true,
                articles_preview_enabled: true,
                tweetypie_unmention_optimization_enabled: true,
                responsive_web_edit_tweet_api_enabled: true,
                graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
                view_counts_everywhere_api_enabled: true,
                longform_notetweets_consumption_enabled: true,
                responsive_web_twitter_article_tweet_consumption_enabled: true,
                tweet_awards_web_tipping_enabled: false,
                creator_subscriptions_quote_tweet_preview_enabled: false,
                freedom_of_speech_not_reach_fetch_enabled: true,
                standardized_nudges_misinfo: true,
                tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
                rweb_video_timestamps_enabled: true,
                longform_notetweets_rich_text_read_enabled: true,
                longform_notetweets_inline_media_enabled: true,
                responsive_web_enhance_cards_enabled: false
            })
        };
        const response = await this.session.get('https://x.com/i/api/graphql/6uoFezW1o4e-n-VI5vfksA/SearchTimeline', {
            headers: await this.get_headers(),
            params: params
        });
        let keys = response?.data?.data?.search_by_raw_query?.search_timeline?.timeline?.instructions;
        let entries = keys?.find((items) => items.type === "TimelineAddEntries");
        let items = entries?.entries;
        let users = items.filter((items) => !items.entryId.includes("cursor"));
        let content = users.map((items) => ({
            userid: items?.content?.itemContent?.user_results?.result?.rest_id,
            username: items?.content?.itemContent?.user_results?.result?.legacy?.screen_name,
            name: items?.content?.itemContent?.user_results?.result?.legacy?.name,
            blue_verified: items?.content?.itemContent?.user_results?.result?.is_blue_verified,
            can_dm: items?.content?.itemContent?.user_results?.result?.legacy?.can_dm,
            description: items?.content?.itemContent?.user_results?.result?.legacy?.description,
            favorite: items?.content?.itemContent?.user_results?.result?.legacy?.favourites_count,
            followers: items?.content?.itemContent?.user_results?.result?.legacy?.followers_count,
            following: items?.content?.itemContent?.user_results?.result?.legacy?.friends_count,
            location: items?.content?.itemContent?.user_results?.result?.legacy?.location,
            profile: items?.content?.itemContent?.user_results?.result?.legacy?.profile_image_url_https,
            verified: items?.content?.itemContent?.user_results?.result?.legacy?.verified
        }));
        return content;
    }
}
exports.default = TwitterApi;
