// VAUrl.js

import React, {useState} from "react";
import UrlTableVA from "../module/Url_table_va.js";
import UrlInputForm from "../module/Url_input_form.js";

const VAUrl = () => {
    const service_url = "http://manyo.hopto.org";
    const develop_url = "http://localhost:4000";
    const use_url = develop_url;

    const add_url = use_url + "/store_va_url";
    const print_total_va_url = use_url + "/print_total_va_url";
    const remove_va_url = use_url + "/remove_va_url";

    const table_header = {
        title: "Title",
        url: "Url",
        created: "Created",
        delete: "Delete",
    };

    const [data, setData] = useState([]);
    const url_data = {
        data: data,
        setData: setData,
        print_total_url: print_total_va_url,
    };

    return (
        <div>
            <UrlInputForm add_url={add_url} url_data={url_data}></UrlInputForm>
            <UrlTableVA table_header={table_header} url_data={url_data} remove_va_url={remove_va_url}></UrlTableVA>
        </div>
    );
};

export default VAUrl;
