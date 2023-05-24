// UrlTable.js

import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { print_url_list, remove_url } from "../utils/Common.js";

const UrlTable = (props) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteUrl, setDeleteUrl] = useState("");
    const headers = Object.entries(props.table_header);

    const handleDelete = (url) => {
        setDeleteUrl(url);
        setConfirmDelete(true);
    };

    const confirmDeleteAction = async () => {
        // 서버로 삭제 요청 보내는 로직 구현
        if (deleteUrl !== "") {
            await remove_url(deleteUrl, props.remove_url);
        }
        setConfirmDelete(false);
        setDeleteUrl("");
    };

    useEffect(() => {
        print_url_list(props.url_data.setData, props.url_data.print_total_url);
    }, [deleteUrl, props.url_data.print_total_url]);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {headers.map(([key, value]) => (
                            <th key={key}>{value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.url_data.data.map((item, index) => (
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
