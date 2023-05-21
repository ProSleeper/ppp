// UrlTable.js

import React, { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { print_url_list, remove_url } from "../utils/Common.js";

const UrlTable = () => {
    const [data, setData] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteUrl, setDeleteUrl] = useState("");

    const handleDelete = (url) => {
        setDeleteUrl(url);
        setConfirmDelete(true);
    };

    const confirmDeleteAction = () => {
        // 서버로 삭제 요청 보내는 로직 구현
        if (deleteUrl !== "") {
            remove_url(deleteUrl);
        }
        setConfirmDelete(false);
        setDeleteUrl("");
    };

    print_url_list(setData);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Url</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.brand}</td>
                            <td>
                                <a href={item.url} target="_blank" rel="noreferrer">
                                    {item.url}
                                </a>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item.url)}>
                                    <i className="fas fa-times">Del</i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={confirmDelete} onHide={() => setConfirmDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Check Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete it?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDeleteAction}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UrlTable;
