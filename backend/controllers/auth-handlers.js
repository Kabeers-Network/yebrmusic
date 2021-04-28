const storageIndex = require("../functions/storage-index");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const uuid = require("uuid");
const keys = require("../keys");
const config = require("../config");
const {serialize} = require("../functions/misc");
/**
 * Kabeer's IDP OAuth Redirect
 * @param req
 * @param res
 * @returns {Promise<void>}
 * @constructor
 */
const OAuthRedirect = async (req, res) => {
    const info = {
        clientId: keys.app.app_public,
        scopes: config.K_AUTH_SCOPE,
        callback: encodeURIComponent(`${config.SELF_URL}/auth/callback`)
    };
    const state = uuid.v4();
    res.cookie(storageIndex.cookies.OAuthState, state, {
        domain: config.FRONTEND_COOKIE_DOMAIN
    });
    res.redirect(`${config.K_AUTH_FRONTEND}/auth/oauth/v2/authorize?client_id=${info.clientId}&scope=${info.scopes}&redirect_uri=${info.callback}&response_type=code&prompt=chooser&offline_access=true&nonce=${uuid.v4()}&state=${state}`);
};
/**
 * Kabeer's IDP OAuth Handler
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const OAuthCallbackHandler = async (req, res) => {
    if (!req.query.code || !req.cookies[storageIndex.cookies.OAuthState]) return res.status(302).end();
    if (req.query.state !== req.cookies[storageIndex.cookies.OAuthState]) return res.redirect(`${config.FRONTEND_URL}/internal/error/INVALID_STATE/view?redirect_to=${encodeURIComponent(`${config.SELF_URL}/auth/redirect`)}`);

    try {
        const response = await axios({
            method: "post",
            url: `${config.K_AUTH_URL}/auth/oauth/v2/token`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: serialize({
                "app_id": keys.app.app_public,
                "app_secret": keys.app.app_secret,
                "code": req.query.code,
                "grant_type": "authorization_code"
            })
        }).then(r => r.data);
        res.clearCookie(storageIndex.cookies.OAuthState);
        const {id_token, refresh_token} = response;
        const userinfo = await jwt.verify(id_token, keys.KabeerAuthPlatform_Public_RSA_Key);
        const tokenPayload = await jwt.verify(refresh_token, keys.KabeerAuthPlatform_Public_RSA_Key);

        res.cookie(storageIndex.cookies.UserData, JSON.stringify(userinfo), {
            domain: config.FRONTEND_COOKIE_DOMAIN,
            maxAge: tokenPayload.exp
        });
        res.cookie(storageIndex.cookies.Tokens, JSON.stringify(response), {
            domain: config.FRONTEND_COOKIE_DOMAIN,
            maxAge: 7.2e+6 // ~ 2 Hours
        });
        res.cookie(storageIndex.cookies.RefreshToken, refresh_token, {
            domain: config.FRONTEND_COOKIE_DOMAIN,
            maxAge: tokenPayload.exp
        });

        res.redirect(config.FRONTEND_URL || "/");

    } catch (e) {
        console.log(e)
        return res.status(400).json(e.message);
    }
};
/**
 * Refresh Kabeer IDP Token
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const RefreshToken = async (req, res) => {
    if (!req.cookies[storageIndex.cookies.RefreshToken]) return res.redirect(`${config.SELF_URL}/auth/redirect`);
    const refreshToken = req.cookies[storageIndex.cookies.RefreshToken];
    const tokenPayload = JSON.parse(Buffer.from(refreshToken.split(".")[1], "base64"));
    if (tokenPayload.iat > tokenPayload.exp) return res.redirect(`${config.SELF_URL}/auth/redirect`);
    try {
        const response = await axios({
            method: "post",
            url: `${config.K_AUTH_URL}/auth/oauth/v2/token`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: serialize({
                "app_id": keys.app.app_public,
                "app_secret": keys.app.app_secret,
                "refresh_token": refreshToken,
                "grant_type": "refresh_token"
            })
        });
        const userinfo = await jwt.verify(response.data["id_token"], keys.KabeerAuthPlatform_Public_RSA_Key);
        res.cookie(storageIndex.cookies.UserData, JSON.stringify(userinfo), {
            domain: config.FRONTEND_COOKIE_DOMAIN,
        });
        res.cookie(storageIndex.cookies.Tokens, JSON.stringify({...response.data, refresh_token: refreshToken}), {
            domain: config.FRONTEND_COOKIE_DOMAIN,
            maxAge: 7.2e+6
        });
        res.cookie(storageIndex.cookies.RefreshToken, refreshToken, {
            domain: config.FRONTEND_COOKIE_DOMAIN,
            maxAge: tokenPayload.exp
        });
        req.query.redirect_uri ? res.redirect(req.query.redirect_uri) : res.json({
            expire: "1h",
            exp: response.data["expires_in"],
            tokens: response.data,
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json(e.message);
    }
};
/**
 * Get Token For Data-Collection Microservice
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetDataServerKey = async (req, res) => {
    if (!req.headers.authorization) return res.status(400).json("Bad Request");
    try {
        // TODO: add new Scopes to IDP and also require them during /redirect
        const decoded = await jwt.verify(req.headers.authorization.split(" ")[1], keys.KabeerAuthPlatform_Public_RSA_Key, {
            algorithms: "RS256"
        });
        if (!decoded) return res.status(400).end();
        const token = await jwt.sign({
            sub: decoded.sub,
            scope: "__kn.music.data-collection.write-watch|__kn.music.data-collection.update-rating|__kn.music.data-collection.get-song|__kn.music.data-collection.get-rating-details",
        }, process.env.DATA_SERVER_TOKEN);
        return res.json({
            sub: decoded.sub,
            scope: "__kn.music.data-collection.write-watch|__kn.music.data-collection.update-rating|__kn.music.data-collection.get-song".split("|"),
            access_token: token,
        });
    } catch (e) {
        return res.status(400).json(e.message);
    }
}
/**
 * @deprecated
 * This was created for the old-Kabeer IDP - now we just add a id_token grant which has all the necessary details
 * @param req
 * @param res
 * @returns {Promise<*>}
 * @constructor
 */
const GetUserInfo = async (req, res) => {
    if (!req.cookies[storageIndex.cookies.Tokens]) return res.status(400).end();
    try {
        const id_token = JSON.parse(req.cookies[storageIndex.cookies.Tokens])['id_token'];
        const user_info = await axios.post(`${config.K_AUTH_URL}/user/userinfo`, serialize({
            token: id_token
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        res.json(user_info.data);
    } catch (e) {
        console.log(e)
        res.status(400).end();
    }
}
module.exports = {
    OAuthCallbackHandler,
    OAuthRedirect,
    RefreshToken,
    GetDataServerKey,
    GetUserInfo
};
