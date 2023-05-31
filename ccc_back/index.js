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
    const receive_urls = req.body.url;
    result = await service.add_url(receive_urls);
    res.send(result);
});

app.get("/print_total_url", async (req, res) => {
    const total_url = await service.get_total_url();
    res.send(total_url);
});

app.delete("/remove_url", async (req, res) => {
    const receive_remove_url = req.body.url;
    move_result = await service.move_and_delete_url(receive_remove_url);
    res.send(move_result);
}); //end_cloth_controller

// va_controller
app.post("/store_va_url", async (req, res) => {
    const receive_urls = req.body.url;
    result = await va_service.StoreVAUrl(receive_urls);
    res.send(result);
});

app.get("/print_total_va_url", async (req, res) => {
    const total_url = await va_service.GetTotalVAUrl();
    res.send(total_url);
});

app.delete("/remove_va_url", async (req, res) => {
    const receive_remove_url = req.body.url;
    move_result = await va_service.MoveAndDeleteUrl(receive_remove_url);
    res.send(move_result);
});
//end_va_controller

app.post("/store_push_sub_data", async (req, res) => {
    console.log(req.body);

    res.send("sub store ok");
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
