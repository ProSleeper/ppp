const crawl_main = require("C://Users//ingn//Documents//ppp//ccc_back//src//main//ccc//crawl_main.js");

test("매일 00:00 시에 동작하는 코드를 테스트", () => {
    // 기존의 Date 생성자를 저장
    const originalDate = global.Date;
    
    // 실행하고자 하는 시간을 설정 (2023년 6월 6일 00:00:00)
    const targetDate = new Date("2023-06-06T00:00:00Z");
    
    // Date 생성자를 mock 함수로 대체
    global.Date = jest.fn(() => targetDate);

    // 테스트 코드에서 함수를 실행
    crawl_main();

    // crawl_main 함수가 예상대로 실행되는지 확인
    // 이 부분은 crawl_main 함수가 실행되는 결과에 따라 적절하게 수정해야 합니다.
    // 예를 들어, crawl_main 함수가 데이터를 반환한다면 반환된 데이터를 검증할 수 있습니다.
    // 현재는 crawl_main 함수가 아무런 결과를 반환하지 않는다고 가정하고 테스트 코드를 작성합니다.
    // 만약 crawl_main 함수가 Promise를 반환하고, 해당 Promise가 resolve되었을 때의 결과를 검증해야 한다면,
    // 반환된 Promise를 사용하여 비동기 검증을 수행해야 합니다.
    
    // 예상대로 함수가 한 번 호출되었는지 확인
    expect(crawl_main).toHaveBeenCalledTimes(1);

    // Date 생성자를 원래대로 복원
    global.Date = originalDate;
});
