const path = require('path');
const express = require("express");
const app = express();
const cors = require("cors");
const service = require("./src/service/service.js");
const va_service = require("./src/va/va_data_service.js");

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
    const receive_url = req.body.url;
    const result = await service.add_url(receive_url);
    // if (result) {
    //     const total_url = await service.get_total_url();
    //     res.send(total_url);
    // }
    res.send(result);
});

app.get("/print_total_url", async (req, res) => {
    const total_url = await service.get_total_url();
    res.send(total_url);
});

app.delete("/remove_url", async (req, res) => {
    const receive_remove_url = req.body.url;
    const result = await service.remove_url(receive_remove_url);
    res.send(result);
});

// va_controller
app.post("/store_va_url", async (req, res) => {
    // console.log(req.body.url); // 요청으로 온 데이터의 body 속성 출력
    const receive_url = req.body.url;
    const result = await va_service.StoreVAUrl(receive_url);
    res.send(result);
});

app.get("/print_total_va_url", async (req, res) => {
    const total_url = await va_service.GetTotalVAUrl();
    res.send(total_url);
});

app.delete("/remove_va_url", async (req, res) => {
    const receive_remove_url = req.body.url;
    const result = await va_service.RemoveVAUrl(receive_remove_url);
    res.send(result);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
