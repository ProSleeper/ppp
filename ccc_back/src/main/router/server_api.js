const service = require("../service/service.js");
const va_service = require("../va/va_data_service.js");

module.exports = (app) => {
    cloth_controller(app);
    va_controller(app);
};

const cloth_controller = (app) => {
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
    });
};

const va_controller = (app) => {
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
};
