# ssl 인증 방법
- 도메인은 알아서 구하자.[내 도메인 한국](https://xn--220b31d95hq8o.xn--3e0b707e/) 여기는 무료고, [고대디](https://kr.godaddy.com/) 이런 업체에서 유료로 년 단위로 구매도 가능하다(유명하거나 다들 필요한 도메인이 아니면 저렴하다.)
- aws같은 클라우드 업체를 사용하면 좀 더 쉽게 ssl(https) 인증을 할 수 있지만, 상용할 예정이 아니라면 무료 ssl인증만으로도 일단 충분하다고 생각된다.
  - [ssl for free](https://www.sslforfree.com/) 난 이 사이트를 많이 이용했다.
  - 위의 내 도메인 한국을 이용한다고 가정하고 [CNAME 인증](https://onu0624.tistory.com/105) 잘 보고 따라하면 아주 쉽다.
  - 위의 ssl for free 사이트의 인증은 email, cname, http 이렇게 총 3개가 있는데, 내 도메인은 무조건 http만 가능한 줄 알았는데 cname이 훨씬 쉽고 간단했다. 다만 http에 파일을 올리는 방법도 알아두자. 나중에 왠지 쓸모 있을 거 같다.
  - 여튼 cname인증을 하고 나면 zip파일을 다운받을 수 있다. 압축을 풀면 3개의 파일이 나온다. ca_bundle.crt, certificate.crt, private.key 이 파일을 내 서버 디렉토리에 넣고(넣은 구조나 위치는 프로젝트나, 사용 프레임워크에 따라 다르다. 다만 nodejs는 프로젝트 최상위에 폴더를 만들고 넣으면 되는 것 같다.) 코드에서 파일을 읽는 부분을 구현하면 된다.
- 이 프로젝트 (옷 가격 크롤링)은 ccc_back/ssl_keys 디렉토리에 파일들을 넣고 ccc_back/main.js에 이 파일들을 읽어와서 적용시킨다.