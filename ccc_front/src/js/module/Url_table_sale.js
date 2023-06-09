// UrlTable.js

import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { print_url_list, remove_sale_data } from "../utils/Common.js";
//va용으로 만들 테이블. 코드가 거의 같은데 당장 시간이 부족해서 그냥 복사 붙여넣기로 하나 만듬
//조금만 수정하면 중복 없이 만드는 거 가능할거 같은데 ㅠㅠ
const UrlTableSale = (props) => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteObj, setDeleteObj] = useState({});
    const headers = Object.entries(props.table_header);

    const handleDelete = (item) => {
        setDeleteObj(item);
        setConfirmDelete(true);
    };

    // myObject가 빈 값인지 확인하는 함수
    const isDeleteObjEmpty = () => {
        return Object.keys(deleteObj).length !== 0;
    };

    const confirmDeleteAction = async () => {
        // 서버로 삭제 요청 보내는 로직 구현
        if (isDeleteObjEmpty()) {
            // 날짜(시간까지), 값, url

            // console.log(deleteObj.url);
            // console.log(deleteObj.change_date);
            // console.log(deleteObj.sale_price);
            // await remove_url(deleteUrl, props.remove_sale_url);
            const dateObj = new Date(deleteObj.change_date);
            const formattedDate = dateObj.toISOString().slice(0, 19).replace("T", " ");
            await remove_sale_data(
                { url: deleteObj.url, change_date: formattedDate, sale_price: deleteObj.sale_price },
                props.remove_sale_url
            );
        }
        setConfirmDelete(false);
        setDeleteObj({});
    };
    // console.log(props.print_total_va_url);
    // print_url_list(setData, props.print_total_va_url);

    useEffect(() => {
        print_url_list(props.url_data.setData, props.url_data.print_total_url);
    }, [deleteObj, props.url_data.print_total_url]);

    const toWonBill = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const td_Height = 80;
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>{headers.map(([key, value]) => key !== "url" && <th key={key}>{value}</th>)}</tr>
                </thead>
                <tbody>
                    {props.url_data.data.map((item, index) => (
                        <tr className="ft-size" key={index}>
                            <td
                                style={{
                                    height: td_Height,
                                    wordWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                    overflow: "visible",
                                }}
                            >
                                {item.brand}
                            </td>
                            <td
                                style={{
                                    height: td_Height,
                                    wordWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                    overflow: "hidden",
                                    // display: "-webkit-box",
                                    // WebkitLineClamp: 3,
                                    // WebkitBoxOrient: "vertical",
                                }}
                            >
                                <a href={item.url} target="_blank" rel="noreferrer">
                                    {item.title.length > 10 ? item.title.substring(0, 10) + "..." : item.title}
                                </a>
                            </td>
                            <td
                                style={{
                                    height: td_Height,
                                    wordWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                    overflow: "visible",
                                }}
                            >
                                {(() => {
                                    const date = new Date(item.change_date);
                                    let hours = date.getHours();
                                    if (hours === 24) {
                                        hours = "00";
                                    }
                                    return `${date.getFullYear().toString().substr(-2)}/${(date.getMonth() + 1)
                                        .toString()
                                        .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")} ${hours
                                        .toString()
                                        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
                                })()}
                            </td>
                            <td
                                style={{
                                    height: td_Height,
                                    wordWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                    overflow: "visible",
                                }}
                            >
                                {toWonBill(item.sale_price)}원
                            </td>
                            <td
                                style={{
                                    height: td_Height,
                                    wordWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                    overflow: "hidden",
                                }}
                            >
                                {toWonBill(item.prev_price)}원
                            </td>
                            <td
                                style={{
                                    height: td_Height,
                                    wordWrap: "break-word",
                                    whiteSpace: "pre-wrap",
                                    overflow: "hidden",
                                }}
                            >
                                l{"\n"}
                                {toWonBill(item.lowest_price)}원{"\n"}h{"\n"}
                                {toWonBill(item.highest_price)}원
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item)}>
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

export default UrlTableSale;
