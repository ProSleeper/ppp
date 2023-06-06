const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const was = require("./src/main/router/server_was");
const api = require("./src/main/router/server_api");
const push = require("./src/main/router/server_push");

const options = {
    key: fs.readFileSync(path.join(__dirname, "/ssl_keys/private.key"), "utf8"),
    cert: fs.readFileSync(path.join(__dirname, "/ssl_keys/certificate.crt"), "utf8"),
    ca: fs.readFileSync(path.join(__dirname, "/ssl_keys/ca_bundle.crt"), "utf8"),
};

const portForHttp = 4000;
const portForHttps = 4001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const redirect_https_url = process.env.HTTPS_URL + req.url;
    if (!req.secure) {
        res.redirect(redirect_https_url);
    } else {
        next();
    }
});

//이 부분에서 was, api, push 다 추가하면 될듯.
was(app, express);
api(app);
push(app);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(portForHttp, function () {
    console.log("Http server listening on port " + portForHttp);
});

httpsServer.listen(portForHttps, function () {
    console.log("Https server listening on port " + portForHttps);
});
