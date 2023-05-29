const path = require('path');
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const cors = require("cors");
const service = require("./src/service/service.js");
const va_service = require("./src/va/va_data_service.js");
require("dotenv").config();

const options = {
    key: fs.readFileSync(path.join(__dirname, "/ssl_keys/private.key"), "utf8"),
    cert: fs.readFileSync(path.join(__dirname, "/ssl_keys/certificate.crt"), "utf8"),
    ca: fs.readFileSync(path.join(__dirname, "/ssl_keys/ca_bundle.crt"), "utf8"),
};

const portForHttp = 4000;
const portForHttps = 4001;

app.use(cors());
const react_build_file = path.join(__dirname, "../ccc_front/build");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const domain = process.env.HTTPS_URL;

app.get("*", (req, res, next) => {
    if (!req.secure) {
        console.log(`${domain}${req.url}`);
        res.redirect(`${domain}${req.url}`);
    } else {
        next();
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(react_build_file, "index.html"));
});

app.get("/add_url", (req, res) => {
    res.sendFile(path.join(react_build_file, "index.html"));
});

app.get("/va_url", (req, res) => {
    res.sendFile(path.join(react_build_file, "index.html"));
});

//cloth controller
app.post("/store_url", async (req, res) => {
    // console.log(req.body.url); // 요청으로 온 데이터의 body 속성 출력
    const receive_url = req.body.url;
    musinsa.com;
    const arr_receive_url = receive_url.split(" ");
    console.time("db query");
    let result = null;
    for (const url of arr_receive_url) {
        result = await service.add_url(url);
    }
    console.timeEnd("db query");
    res.send(result);
});

app.get("/print_total_url", async (req, res) => {
    const total_url = await service.get_total_url();
    res.send(total_url);
});

app.delete("/remove_url", async (req, res) => {
    const receive_remove_url = req.body.url;
    const to_be_deleted_url_data = await service.get_one_url(receive_remove_url);
    let move_result = "";

    for (const url_data of to_be_deleted_url_data) {
        move_result = await service.add_deleted_url(url_data.brand, url_data.url);
    }

    const result = await service.remove_url(receive_remove_url);
    res.send(move_result + ", " + result);
});

// va_controller
app.post("/store_va_url", async (req, res) => {
    // console.log(req.body.url); // 요청으로 온 데이터의 body 속성 출력
    const receive_url = req.body.url;
    const arr_receive_url = receive_url.split(" ");
    let result = null;
    for (const url of arr_receive_url) {
        result = await va_service.StoreVAUrl(url);
    }
    res.send("daily end!");
});

app.get("/print_total_va_url", async (req, res) => {
    const total_url = await va_service.GetTotalVAUrl();
    res.send(total_url);
});

app.delete("/remove_va_url", async (req, res) => {
    const receive_remove_url = req.body.url;
    const to_be_deleted_va_data_dto = await va_service.GetOneVAUrl(receive_remove_url);
    let move_result = "";
    for (const va_data of to_be_deleted_va_data_dto) {
        move_result = await va_service.StoreDeletedVAUrl(va_data.title, va_data.url);
    }
    const result = await va_service.RemoveVAUrl(receive_remove_url);
    res.send(move_result + ", " + result);
});

app.use(express.static(react_build_file));


const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(portForHttp, function() {
	console.log("Http server listening on port " + portForHttp);
});

httpsServer.listen(portForHttps, function() {
	console.log("Https server listening on port " + portForHttps);
});


// app.listen(PORT, () => {
//  console.log(`Example app listening on port ${PORT}!`);
// });
