# javascript에서 jest를 사용해서 테스트코드 작성하기 사용방법

# Development Environment
사용가능 환경: nodejs,js,react

## install
1. npm i -D jest (jest 개발의존성으로 설치)
2. package.json 파일에 커맨드 추가
```js
//package.json
 "scripts": {
    "test": "jest"
  },
```

## 사용법
0. jest는 __test__ 폴더와 ***.test.js 로 끝나는 파일을 모두 테스트 파일로 인식한다.
1. __test__ 폴더 생성
2. test.js 파일 생성
```js
//test.js
test("1 is 1", () => {
  expect(1).toBe(1);
});
```
3. npm test 또는 npx jest 또는 npm run jest 모두 실행 가능하다.(package.json에서 test를 jest로 실행하라고 지정했기 때문에.)
4. 만약 특정 파일이나 특정 폴더만 실행하고 싶다면 명령어 뒤에 경로를 붙여주면 된다.
5. 이때 주의할 점은 test.js라는 파일만 테스트 하고 싶어서 npm test test.js 로 명령어를 실행하면 프로젝트 내의 모든 폴더에서 ***.test.js를 실행하게 된다.
6. 그래서 만약 test.js라는 파일이 여러폴더에 존재한다면 고유한 경로를 적어주면 된다. 예를 들면 npm test src/test.js 실행하면 src하위에 있는 test.js만 실행된다.
7. 특정 폴더만 실행도 마찬가지다 npm test __test__/folder 의 형식으로 명령어를 실행하면 된다.
8. 마지막으로 npx jest는 프로젝트 내의 node_modules에서 jest를 자동적으로 찾아서 실행해줘서 프로젝트 내 어디서 npx jest를 하더라도 동일한 결과를 얻을 수 있다고 한다.


## 간단 설명
- 헤더 추가와 main함수 부분은 테스트가 많아지거나 나눌 필요가 생기지 않는 이상 그냥 두어도 된다.
```cpp
    TEST(test_suit_name, test_case_name) { ASSERT_EQ(actual, expected); }
    TEST(test_suit_name, test_case_name) { EXPECT_EQ(actual, expected); }
```
- 위와 같이 사용하면 되고 test_suit_name은 GPT의 설명에 따르면 "테스트 케이스들의 집합을 의미하며, 특정 기능 또는 모듈을 테스트하기 위한 여러 테스트 케이스들을 하나로 묶은 것입니다." 이라고 한다.
- test_name은 말 그대로 어떤 테스트 집합에 개별적인 테스트라고 보면 된다.
- 위의 main.cpp의 예제처럼 factorial 함수 테스트 시, 입력으로 1,2,10,100 등 다양한 테스트가 필요하므로 각각의 테스트 케이스를 적으면 된다.
- 그리고 문자열이 아닌, 함수의 인자처럼 입력하면 된다.(물론 인자로 사용되지는 않는다.)
- 그리고 기본적인 테스트 방법으로는 ASSERT_EQ, EXPECT_EQ 두개가 존재하는데 사용방법은 동일하다.
- actual: 실제 실행 코드, expected: 기대값(예상값)
- 마지막으로 두 매크로함수의 차이는 ASSERT_EQ는 결과가 fail이면 현재 코드를 중단하고, EXPECT_EQ는 중단하지 않는다.

## 참고 자료
- [테스팅 명령어](https://usage.tistory.com/99)
- [여러가지 테스트 코드 참고](https://seungjuitmemo.tistory.com/269)
- [설마 아직도 테스트 코드를 작성 안하시나요?](https://ssowonny.medium.com/설마-아직도-테스트-코드를-작성-안-하시나요-b54ec61ef91a)