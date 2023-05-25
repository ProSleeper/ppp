const path = require('path');
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const app = express();
const cors = require("cors");
const service = require("./src/service/service.js");
const va_service = require("./src/va/va_data_service.js");

const options = {
	key : fs.readFileSync("ssl_keys/private.key"),
    cert: fs.readFileSync("ssl_keys/certificate.crt"),
    ca : fs.readFileSync("ssl_keys/ca_bundle.crt")
}


const portForHttp = 4000;
const portForHttps = 4001;

app.use(cors());
const PORT = 4000;
const react_build_file = path.join(__dirname, "..", "ccc_front", "build");

app.use(express.static(react_build_file));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    const receive_url = req.body.url;musinsa.com
    const arr_receive_url = receive_url.split(" ");
    let result = null;
    for (const url of arr_receive_url) {
        result = await service.add_url(url);
    }

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
