// AddUrl.js

import React from "react";
import UrlTable from "../module/Url_table.js";
import UrlInputForm from "../module/Url_input_form.js";

const AddUrl = () => {
    return (
        <div>
            <UrlInputForm></UrlInputForm>
            <UrlTable></UrlTable>
        </div>
    );
};

export default AddUrl;
