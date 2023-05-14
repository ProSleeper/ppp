-- root 계정으로 접속 후

create database ccc;

use ccc;

CREATE USER 'u0_a177'@'localhost' IDENTIFIED BY 'suzi123';

grant all privileges on ccc.* to 'u0_a177'@'localhost';

flush privileges;

-- 윈도우에서 환경변수를 설정해도 에러가 날때 해결 방법
-- ALTER USER 'u0_a177'@'localhost' IDENTIFIED WITH mysql_native_password BY 'suzi123';

-- 추후에 나머지 테이블은 이 url_data테이블의 url을 참조해야한다.
CREATE TABLE url_data (
  brand VARCHAR(255) not null,
  url VARCHAR(700) NOT NULL,
  PRIMARY key(url)
);

CREATE TABLE daily_data (
  brand VARCHAR(255) not null,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(700) NOT NULL,
  today DATE not null,
  time0_price int,
  time1_price int,
  time2_price int,
  time3_price int,
  time4_price int,
  time5_price int,
  time6_price int,
  time7_price int,
  time8_price int,
  time9_price int,
  time10_price int,
  time11_price int,
  time12_price int,
  time13_price int,
  time14_price int,
  time15_price int,
  time16_price int,
  time17_price int,
  time18_price int,
  time19_price int,
  time20_price int,
  time21_price int,
  time22_price int,
  time23_price int,
  PRIMARY KEY (url, today)
);

CREATE TABLE prev_daily_data (
  brand VARCHAR(255) not null,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(700) NOT NULL,
  today DATE not null,
  time0_price int,
  time1_price int,
  time2_price int,
  time3_price int,
  time4_price int,
  time5_price int,
  time6_price int,
  time7_price int,
  time8_price int,
  time9_price int,
  time10_price int,
  time11_price int,
  time12_price int,
  time13_price int,
  time14_price int,
  time15_price int,
  time16_price int,
  time17_price int,
  time18_price int,
  time19_price int,
  time20_price int,
  time21_price int,
  time22_price int,
  time23_price int,
  PRIMARY KEY (url, today)
);


CREATE TABLE monthly_data (
  brand VARCHAR(255) not null,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(700) NOT NULL,
  month DATE not null,
  day1_price int,
  day2_price int,
  day3_price int,
  day4_price int,
  day5_price int,
  day6_price int,
  day7_price int,
  day8_price int,
  day9_price int,
  day10_price int,
  day11_price int,
  day12_price int,
  day13_price int,
  day14_price int,
  day15_price int,
  day16_price int,
  day17_price int,
  day18_price int,
  day19_price int,
  day20_price int,
  day21_price int,
  day22_price int,
  day23_price int,
  day24_price int,
  day25_price int,
  day26_price int,
  day27_price int,
  day28_price int,
  day29_price int,
  day30_price int,
  day31_price int,
  PRIMARY KEY (url)
);


CREATE TABLE sale_data (
  brand VARCHAR(255) not null,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(700) NOT NULL,
  change_date DATE not null,
  sale_price int not null,
  prev_price int not null
);




insert into url_data(brand, url) values('musinsa', 'https://www.musinsa.com/app/goods/595039');
insert into url_data(brand, url) values('musinsa', 'https://www.musinsa.com/app/goods/3128322');
insert into url_data(brand, url) values('musinsa', 'https://www.musinsa.com/app/goods/3128245');
insert into url_data(brand, url) values('musinsa', 'https://www.musinsa.com/app/goods/2091749');
insert into url_data(brand, url) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?displayNo=&goodsNo=NQ31145962&stonType=P&storeNo=83&siteNo=50706');
insert into url_data(brand, url) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145684&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#');
insert into url_data(brand, url) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31146507&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#');
insert into url_data(brand, url) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145951&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#');
insert into url_data(brand, url) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145959&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#');
insert into url_data(brand, url) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145988&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#');
insert into url_data(brand, url) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145977&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#');
insert into url_data(brand, url) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145978&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#');
insert into url_data(brand, url) values('spao', 'https://spao.com/product/%EB%8D%B0%EC%9D%BC%EB%A6%AC%EC%A7%80-%EB%A3%A8%EC%A6%88%ED%95%8F-%EC%A7%84sptjd23c52/10010/category/187/display/1/');
insert into url_data(brand, url) values('spao', 'https://spao.com/product/%EB%8D%B0%EC%9D%BC%EB%A6%AC%EC%A7%80-%EC%9B%90%ED%84%B1-%EC%99%80%EC%9D%B4%EB%93%9C-%EC%A7%84sptjd23c54/10022/category/187/display/1/#none');
insert into url_data(brand, url) values('elandmall', 'https://www.elandmall.co.kr/i/item?itemNo=2212607800&lowerVendNo=LV16003579&pageId=1682653534901&preCornerNo=R01404001_srchOutcome');
insert into url_data(brand, url) values('elandmall', 'https://www.elandmall.co.kr/i/item?itemNo=2212615377&lowerVendNo=LV16003579&pageId=1682653559468&preCornerNo=R01404001_srchOutcome');