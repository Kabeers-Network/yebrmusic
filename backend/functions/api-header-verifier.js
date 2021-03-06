const MongoClient = require("../MongoClient");

const APIHeaderVerifier = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(400).json("No Access Token Attached");
    req.__kn = {
        session: {user: {user_id: "bb5dc8842ca31d4603d6aa11448d1654"}}
    }
    next();
};
const _APIHeaderVerifier = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(400).json("No Access Token Attached");
    const db = await MongoClient;
    const user = await db.collection("auth-api-sessions").findOne({
        token: req.headers.authorization.split(" ")[1]
    });
    if (!user) return res.status(400).json("Invalid API Session")
    req.__kn = {
        session: {user}
    }
    next();
};
module.exports = APIHeaderVerifier;
