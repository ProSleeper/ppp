const service = require("../service/service.js");
const va_service = require("../va/va_data_service.js");
const sale_service = require("../service/sale_service.js");

module.exports = (app) => {
    sale_controller(app);
    cloth_controller(app);
    va_controller(app);
};

const sale_controller = (app) => {
    app.get("/print_total_sale_data", async (req, res) => {
        const total_sale_data = await sale_service.get_total_sale_data();
        res.send(total_sale_data);
    });

    app.delete("/remove_sale_data", async (req, res) => {
        const { url, change_date, sale_price } = req.body;
        console.log(change_date);
        const deleted_result = await sale_service.remove_sale_data(url, change_date, sale_price);
        res.send(deleted_result);
    });
};

const cloth_controller = (app) => {
    app.post("/store_url", async (req, res) => {
        const receive_urls = req.body.url;
        const add_result = await service.add_url(receive_urls);
        res.send(add_result);
    });

    app.get("/print_total_url", async (req, res) => {
        const total_url = await service.get_total_url();
        res.send(total_url);
    });

    app.delete("/remove_url", async (req, res) => {
        const receive_remove_url = req.body.url;
        const move_result = await service.move_and_delete_url(receive_remove_url);
        res.send(move_result);
    });
};

const va_controller = (app) => {
    app.post("/store_va_url", async (req, res) => {
        const receive_urls = req.body.url;
        const store_result = await va_service.StoreVAUrl(receive_urls);
        res.send(store_result);
    });

    app.get("/print_total_va_url", async (req, res) => {
        const total_url = await va_service.GetTotalVAUrl();
        res.send(total_url);
    });

    app.delete("/remove_va_url", async (req, res) => {
        const receive_remove_url = req.body.url;
        const move_result = await va_service.MoveAndDeleteUrl(receive_remove_url);
        res.send(move_result);
    });
};
