const originalDateNow = Date.now;
const customDateNow = jest.fn(() => new Date("2023-06-06T00:00:00Z").getTime());
beforeAll(() => {
    Date.now = customDateNow;
});

afterAll(() => {
    Date.now = originalDateNow;
});

test("매일 00:00 시에 동작하는 코드를 테스트", () => {
    // 테스트할 코드 작성
    // 예시: 매일 00:00 시에 실행되어야 하는 함수
    const myFunction = jest.fn();
    // 테스트 코드에서 함수를 실행
    myFunction();

    // 예상대로 함수가 호출되는지 확인
    expect(myFunction).toHaveBeenCalledTimes(1);
});
