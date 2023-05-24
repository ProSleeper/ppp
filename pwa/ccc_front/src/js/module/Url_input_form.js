// AddUrl.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { store_url } from "../utils/Common.js";

const UrlInputForm = (props) => {
    const [url, setUrl] = useState("");
    return (
        <div className="container mt-5">
            <Form onSubmit={(event) => store_url(event, url, props.add_url, props.url_data)}>
                <Form.Group controlId="formBasicUrl">
                    <Form.Label>URL input</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <Form.Text className="text-muted">Send the URL you entered to the server.</Form.Text>
                </Form.Group>
                <Button className="col-md-3 offset-sm-9 btn-submit" variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default UrlInputForm;
