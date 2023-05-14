// AddUrl.js

import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import handleSubmit from "../utils/Common.js";

const AddUrl = () => {
    const [url, setUrl] = useState("");
    const [data, setData] = useState([]);
    return (
        <div className="container mt-5">
            <Form onSubmit={(event) => handleSubmit(event, url, setData)}>
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.brand}</td>
                            <td>
                                <a href={item.url} target="_blank" rel="noreferrer">
                                    {item.url}
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AddUrl;
