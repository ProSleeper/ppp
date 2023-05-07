// AddUrl.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import handleSubmit from "../utils/Common.js";

const AddUrl = () => {
    const [url, setUrl] = useState("");
    return (
        <div className="container mt-5">
            <Form onSubmit={(event) => handleSubmit(event, url)}>
                <Form.Group controlId="formBasicUrl">
                    <Form.Label>URL 입력</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <Form.Text className="text-muted">입력한 URL을 서버로 전송합니다.</Form.Text>
                </Form.Group>

                <Button className="col-md-3 offset-sm-9 btn-submit" variant="primary" type="submit">
                    전송
                </Button>
            </Form>
        </div>
    );
};

export default AddUrl;
