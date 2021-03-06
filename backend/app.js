const express = require("express");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const cors = require("cors");
const DDOS = require("ddos");
// const rateLimit = require("express-rate-limit");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
const config = require("./config");

const APIAuthVerifier = require("./functions/api-header-verifier");
// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 10 minutes 20 request
//     max: 100 // limit each IP to 100 requests per windowMs TODO Default 10
// });
// const keys = require("./keys");
// const ddos = new DDOS({burst: 10, limit: 15})
const ddos = new DDOS({burst: 999, limit: 999})
const app = express();
// https://export.kabeercloud.tk/u/v/6085bd1a3622aBb%20ki%20vines.html

const coreScraper = require("./routes/core-scraper-routes");
const authRouter = require("./routes/auth-routes");
const songsRouter = require("./routes/api-routes");
const recommendationRouter = require("./routes/recommendation-routes");

app.use(ddos.express);
//app.use('/api/', limiter);
app.use(cors({
    credentials: true, optionsSuccessStatus: 200,
    origin: (origin, callback) => (origin === config.FRONTEND_URL || !origin) ? callback(null, true) : callback(new Error("Cors error occurred"))
}));
// app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json({}));
app.use(express.urlencoded({extended: true}));
// app.use(session({
//     secret: "5s323720194bccb1cb94164a13E144994E3E17F9B",
//     resave: true,
//     cookie: {
//         secure: false
//     },
//     saveUninitialized: true,
//     store: new MongoStore({
//         url: keys.db.url
//     })
// }));
app.set("json spaces", 2);
// app.set('trust proxy', true);
app.use("/api", APIAuthVerifier, songsRouter);
app.use("/auth", authRouter);
app.use("/recommendation", recommendationRouter);
/**
 * @deprecated
 */
app.use("/backend", coreScraper);


app.use((req, res) => res.json("404 - Route Not Found"));
app.use((err, req, res) => res.status(500).json(err.message));

module.exports = app;


//PLkqz3S84Tw-TGS_ltn3Yu_4JQAulJqXrL
