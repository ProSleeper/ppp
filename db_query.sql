-- root 계정으로 접속 후

create database ccc;

use ccc;

CREATE USER 'u0_a177'@'localhost' IDENTIFIED BY 'suzi123';

grant all privileges on ccc.* to 'u0_a177'@'localhost';

flush privileges;

-- 윈도우에서 환경변수를 설정해도 에러가 날때 해결 방법
-- ALTER USER 'u0_a177'@'localhost' IDENTIFIED WITH mysql_native_password BY 'suzi123';
-- 추후에 나머지 테이블은 이 url_data테이블의 url을 참조해야한다.
/*
  *************************ER_TRUNCATED_WRONG_VALUE_FOR_FIELD 발생해서 찾아봐서 해결한 문제!!!!*************************
  (아래 방법은 mariadb 10.8.x 이상에서 했던 작업이고, mysql도 비슷하지만 버전에 따라 조금씩 다르니까 검색해서 참고 해야한다.)
  linux에서 db컬럼에 한글을 넣으면 encoding문제가 발생한다. 그래서 찾아보니까 버전마다 다르긴 하지만 mysql이든 mariadb든
  현재 웹에서 제일 많이 사용하는 utf8mb4를 사용하도록 설정해줘야한다고 한다.
  인터넷에 mariadb 문자열셋 변경, mysql 문자열셋 변경으로 검색하면 자세히 나온다.
  root로 sql 접속 후 show variables like 'c%'; 하면 현재 db의 encoding 설정이 나오는데, ER_TRUNCATED_WRONG_VALUE_FOR_FIELD 에러가 발생했다면 보통 latinl 혹은 utf8, utf8mb3 로 많은 부분들이 나온다. 최신 웹에서 이모지까지 지원하기 위한 db를 만들려면 utf8mb4로 해야한다.

  먼저 /etc/my.cnf를 바꿔준다.
  vi /etc/my.cnf
  파일을 열면 보통
  ```
  #
  # This group is read ...
  [client-server]
  !includeddir /etc/my.cfg.d
  ```
  대략 위와 같은 내용이 작성 되어 있을 것이다.
  그 하위로 아래 내용을 적어주면 된다.
  ```

  [client]
  default-character-set=utf8mb4

  [mysql]
  default-character-set=utf8mb4

  [mysqldump]
  default-character-set=utf8mb4

  [mysqld]
  character-set-server=utf8mb4
  collation-server=utf8mb4_unicode_ci
  skip-character-set-client-handshake​

  ```
  그리고 저장하고 service mysqld restart
  하고 다시 sql 접속 후 show variables like 'c%'; 하면 거의 모든 부분이 utf8mb4로 되어있다.
  character_set_system은 utf8mb3 일텐데 이건 시스템에서 사용하는 부분이라고 해서 상관없다.
  
  이후에 생기는 db와 table 은 utf8mb4로 생성되지만 이전에 생선한 db와 table은 따로 설정해줘야 한다.
  db 설정: ALTER DATABASE <database_name> CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  table 설정: ALTER TABLE <table_name> CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  
  이제 db에 한글을 작성해도 오류가 안날거다!
*/

CREATE TABLE url_data (
  ID int NOT NULL AUTO_INCREMENT,
  brand VARCHAR(255) not null,
  url VARCHAR(700) unique,
  lowest_price int not null,
  highest_price int not null,
  PRIMARY key(ID)
);

CREATE TABLE deleted_url_data (
  ID int NOT NULL AUTO_INCREMENT,
  brand VARCHAR(255) not null,
  url VARCHAR(700) unique,
  PRIMARY key(ID)
);

CREATE TABLE daily_data (
  ID int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (ID)
);

CREATE TABLE prev_daily_data (
  ID int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (ID)
);

CREATE TABLE monthly_data (
  ID int NOT NULL AUTO_INCREMENT,
  brand VARCHAR(255) not null,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(700) unique,
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
  PRIMARY KEY (ID)
);

CREATE TABLE sale_data (
  ID int NOT NULL AUTO_INCREMENT,
  brand VARCHAR(255) not null,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(700) NOT NULL,
  change_date DATETIME not null,
  sale_price int not null,
  prev_price int not null,
  PRIMARY KEY(ID)
);

CREATE TABLE va_data (
  ID int NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(700) unique,
  created DATETIME not null,
  primary key(ID)
);

CREATE TABLE deleted_va_data (
  ID int NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(700) unique,
  created DATETIME not null,
  primary key(ID)
);

create table subscriber_data (
	id int AUTO_INCREMENT,
	created datetime not null,
	cookie varchar(255) unique,
	endpoint varchar(255) unique,
  expiration_time datetime,
	p256dh varchar(255) not null,
	auth varchar(255) not null,
	primary key(id)
);

insert into url_data(brand, url, lowest_price, highest_price) values('musinsa', 'https://www.musinsa.com/app/goods/595039', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('musinsa', 'https://www.musinsa.com/app/goods/3128322', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('musinsa', 'https://www.musinsa.com/app/goods/3128245', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('musinsa', 'https://www.musinsa.com/app/goods/2091749', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?displayNo=&goodsNo=NQ31145962&stonType=P&storeNo=83&siteNo=50706', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145684&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31146507&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145951&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145959&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145988&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145977&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('uniqlo', 'https://store-kr.uniqlo.com/display/showDisplayCache.lecs?goodsNo=NQ31145978&infw_disp_no_sct_cd=10&stonType=P&storeNo=83&siteNo=50706#', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('spao', 'https://spao.com/product/%EB%8D%B0%EC%9D%BC%EB%A6%AC%EC%A7%80-%EB%A3%A8%EC%A6%88%ED%95%8F-%EC%A7%84sptjd23c52/10010/category/187/display/1/', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('spao', 'https://spao.com/product/%EB%8D%B0%EC%9D%BC%EB%A6%AC%EC%A7%80-%EC%9B%90%ED%84%B1-%EC%99%80%EC%9D%B4%EB%93%9C-%EC%A7%84sptjd23c54/10022/category/187/display/1/#none', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('elandmall', 'https://www.elandmall.co.kr/i/item?itemNo=2212607800&lowerVendNo=LV16003579&pageId=1682653534901&preCornerNo=R01404001_srchOutcome', 0, 0);
insert into url_data(brand, url, lowest_price, highest_price) values('elandmall', 'https://www.elandmall.co.kr/i/item?itemNo=2212615377&lowerVendNo=LV16003579&pageId=1682653559468&preCornerNo=R01404001_srchOutcome', 0, 0);