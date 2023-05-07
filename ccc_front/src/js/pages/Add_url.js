// AddUrl.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { isAndroid, isMacOs, isWindows } from "react-device-detect";

const AddUrl = () => {
    const [url, setUrl] = useState("");
    const reqUrl = (isWindows && "http://127.0.0.1:4000/add_url") || "http://manyo.hopto.org/add_url";

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(reqUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        })
            .then((response) => {
                if (response.ok) {
                    return response;
                }
                throw new Error("Network response was not ok");
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container mt-5">
            <Form onSubmit={handleSubmit}>
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
