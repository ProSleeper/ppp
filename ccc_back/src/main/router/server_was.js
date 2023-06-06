const path = require("path");

module.exports = (app, express) => {
    const react_build_file = path.join(__dirname, "../ccc_front/build");

    app.get("/", (req, res) => {
        res.sendFile(path.join(react_build_file, "index.html"));
    });

    app.get("/add_url", (req, res) => {
        res.sendFile(path.join(react_build_file, "index.html"));
    });

    app.get("/va_url", (req, res) => {
        res.sendFile(path.join(react_build_file, "index.html"));
    });

    app.use(express.static(react_build_file));
};
