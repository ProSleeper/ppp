// ContaUrlsct.js

import React from "react";

const urls = [
    "https://tv16.avsee.in/bbs/board.php?bo_table=javmgs&wr_id=23292",
    "https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1126980",
    "https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1126428",
    "https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1126440",
    "https://tv16.avsee.in/bbs/board.php?bo_table=javfc2&wr_id=66307",
    "https://tv16.avsee.in/bbs/board.php?bo_table=javfc2&wr_id=66068",
    "https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1126424",
    "https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1126427",
    "https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1126970",
];

const OpenInNewTab = ({ url }) => {
    const handleClick = (event) => {
        event.preventDefault();
        window.open(url, "_blank");
    };

    return (
        <div style={{ fontSize: "30px" }}>
            <a href={url} onClick={handleClick}>
                {url}
            </a>
        </div>
    );
};

const Urls = () => {
    return (
        <div>
            {urls.map((url, index) => (
                <OpenInNewTab url={url} key={index} />
            ))}
        </div>
    );
};

export default Urls;