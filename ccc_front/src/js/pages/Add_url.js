// AddUrl.js

import React, { useState } from "react";
import UrlTable from "../module/Url_table.js";
import UrlInputForm from "../module/Url_input_form.js";

const AddUrl = () => {
    const use_url = process.env.REACT_APP_API_URL;

    const add_url = use_url + "/store_url";
    const print_total_url = use_url + "/print_total_url";
    const remove_url = use_url + "/remove_url";

    const table_header = {
        brand: "Brand",
        url: "Url",
        delete: "Delete",
    };

    const [data, setData] = useState([]);
    const url_data = {
        data: data,
        setData: setData,
        print_total_url: print_total_url,
    };

    return (
        <div>
            <UrlInputForm add_url={add_url} url_data={url_data}></UrlInputForm>
            <UrlTable table_header={table_header} url_data={url_data} remove_url={remove_url}></UrlTable>
        </div>
    );
};

export default AddUrl;
