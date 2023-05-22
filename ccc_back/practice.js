const axios = require("axios");

axios
    .get("https://tv16.avsee.in/bbs/board.php?bo_table=javc&wr_id=1126970")
    .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
            console.log("suc");
        }
    })
    .catch((error) => {
        console.error(error);
    });
