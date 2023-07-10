const dateString = "2023-07-04T07:00:00.000Z";
const dateObj = new Date(dateString);

// DB에 다시 넣기 위해 원하는 형식으로 변환
// const formattedDate = dateObj.toISOString(); // "2023-07-04T07:00:00.000Z"
const formattedDate = dateObj.toISOString().slice(0, 19).replace('T', ' ');
// 예시로 변환된 날짜를 출력해보겠습니다.
console.log(dateObj);
console.log(formattedDate);
