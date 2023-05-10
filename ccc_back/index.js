const path = require('path');
const express = require("express");
const app = express();
const { WriteTo } = require("./node_to_cpp");
const { insert_data, update_data, delete_data, select_data } = require("./mysql.js");

// const cors = require('cors');
// const PORT = process.env.PORT || 3000;
const PORT = 4001;
const react_build_file = path.join(__dirname, "..", "ccc_front", "build");

// app.use(cors());
app.use(express.static(react_build_file));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(react_build_file, "index.html"));
});

const wp_list = ["musinsa", "uniqlo"];

const parse_brand = (url) => {
    for (const brand of wp_list) {
        const brandRegex = new RegExp(`${brand}`, "g");
        if (brandRegex.test(url)) {
            return brand;
        }
    }
};

app.get("/add_url", (req, res) => {
    // console.log(req.body.url); // 요청으로 온 데이터의 body 속성 출력

    const web_platform = parse_brand(req.body.url);
    const url = req.body.url;

    // console.log(web_platform); // 요청으로 온 데이터의 body 속성 출력
    // console.log(url); // 요청으로 온 데이터의 body 속성 출력

    // insert_data(web_platform, url);
    WriteTo(JSON.stringify({
        behavior: "INSERT",
        data: {
            brand: "MUSINSA",
            url: "http://musinsa.com"
        }
    }));

    res.send("url save success");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
