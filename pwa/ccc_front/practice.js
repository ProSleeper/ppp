function checkURLAvailability(url) {
    return fetch(url)
        .then((response) => {
            if (response.ok) {
                return true; // URL에 접속 가능
            } else {
                return false; // URL에 접속 불가능
            }
        })
        .catch(() => {
            return false; // URL에 접속 불가능
        });
}

// 사용 예시
const url = "http://musinsa.com";
checkURLAvailability(url)
    .then((result) => {
        if (result) {
            console.log("URL is accessible");
        } else {
            console.log("URL is not accessible");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
