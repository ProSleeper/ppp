#include "mysql_connector.h"
// #include <iostream>

// using namespace std;

MysqlConnector::MysqlConnector(const string strServer, const string strUser, const string strPassword, const string strDatabase)
    : mstrServer(strServer), mstrUser(strUser), mstrPassword(strPassword), mstrDatabase(strDatabase) {
    // first of all create a mysql instance and initialize the variables within
    mpConn = mysql_init(NULL);

    // connect to the database with the details attached.
    if (!mysql_real_connect(mpConn, mstrServer.c_str(), mstrUser.c_str(), mstrPassword.c_str(), mstrDatabase.c_str(), 0, NULL, 0)) {
        printf("Conection error : %s\n", mysql_error(mpConn));
        exit(1);
    }
}

MysqlConnector::~MysqlConnector() {
    /* clean up the database link */
    mysql_close(mpConn);
}

bool MysqlConnector::Insert(const ProductUrl& data) {
    string strInsertQuery = "insert into product_url(brand, url) values('" + data.brand + "', '" + data.url + "')";
    return SendQuery(strInsertQuery); 
}

bool MysqlConnector::Update(const ProductUrl& data) {
    string strUpdateQuery = "update product_url set brand = '" + data.brand + "' where url = '" + data.url + "'";
     return SendQuery(strUpdateQuery); }

bool MysqlConnector::Delete(const ProductUrl& data) { 
    string strDeleteQuery = "delete from product_url where url = '" + data.url + "'";
    return SendQuery(strDeleteQuery); }

bool MysqlConnector::SendQuery(const string strQuery) {
    if (mysql_query(mpConn, strQuery.c_str()) == -1) {
        printf("MySQL query error : %s\n", mysql_error(mpConn));
        return false;
    }
    return true;
}

std::vector<ProductUrl *>* MysqlConnector::Select(const string strQuery) {
    string find_key = "";
    if (strQuery != "") {
        find_key = "where url = '" + strQuery + "'";
    }
    string strSelectQuery = "select * from product_url " + find_key;
    if (!SendQuery(strSelectQuery)) {
        return false;
    }

    if ((mpResults = mysql_use_result(mpConn)) != NULL) {
        munColumnLength = mysql_num_fields(mpResults);
        while ((mRow = mysql_fetch_row(mpResults)) != NULL) {
            ProductUrl* newRow = new ProductUrl();
            newRow->brand = mRow[1];
            newRow->url = mRow[2];
            m_result_list.emplace_back(newRow);
        }
        mysql_free_result(mpResults);
        munColumnLength = 0;
    }
    return &m_result_list;
}

//original function
// const vector<ResultSet *> *MysqlConnector::Select(const string strQuery) {
//     string find_key = "";
//     if (strQuery != "") {
//         find_key = "where url = '" + strQuery + "'";
//     }
//     string strSelectAllQuery = "select * from product_url " + find_key;
//     SendQuery(strSelectAllQuery);
//     if (mpResults != NULL) {
//         while (mRow = mysql_fetch_row(mpResults)) {
//             for (int i = 0; i < munColumnLength; i++) {
//                 printf("%s ", mRow[i]);
//             }
//             printf("\n");
//         }
//         mysql_free_result(mpResults);
//     }
//     munColumnLength = 0;
// }

// const vector<ResultSet *> *MysqlConnector::TotalSelect(const string strQuery) {
//     SendQuery(strQuery);
//     if (mpResults != NULL) {
//         while (mRow = mysql_fetch_row(mpResults)) {
//             for (int i = 0; i < munColumnLength; i++) {
//                 printf("%s ", mRow[i]);
//             }
//             printf("\n");
//         }
//         mysql_free_result(mpResults);
//     }
//     munColumnLength = 0;
// }

// 기존에 사용하던 기본적인 쿼리 작동여부 테스트 코드
/*
bool MysqlConnector::SendQuery(const string sql_query) {
    if (mysql_query(mpConn, sql_query.c_str())) {
        printf("MySQL query error : %s\n", mysql_error(mpConn));
        return false;
    }
    if ((mpResults = mysql_use_result(mpConn)) != NULL) {
        munColumnLength = mysql_num_fields(mpResults);
    }
    return true;
}

void MysqlConnector::PrintQuery() {
    if (mpResults != NULL) {
        while (mpRow = mysql_fetch_row(mpResults)) {
            for (int i = 0; i < munColumnLength; i++) {
                printf("%s ", mpRow[i]);
            }
            printf("\n");
        }
        mysql_free_result(mpResults);
    }

    munColumnLength = 0;
}

// 쿼리 실행 여부를 테스트하는 함수
bool MysqlConnector::HowNameMethod(const string sql_query) {
    if (SendQuery(sql_query)) {
        PrintQuery();
        return true;
    }
    return false;
}



// select 후 결과값을 출력하는건데 추후에 json형식으로 변경하는 코드도 필요할듯.
const std::vector<ResultSet *> *MysqlConnector::GetResultSet() {
    ResultSet *tempRS = new ResultSet;
    string *tempColumn;
    string tempStr;
    while ((mpRow = mysql_fetch_row(mpResults)) != NULL) {
        tempColumn = new string[munColumnLength];
        for (int j = 0; j < munColumnLength; j++) {
            tempStr = mpRow[j];
            tempColumn[j] = tempStr;
        }
        tempRS->ppstrResult = tempColumn;
        tempRS->nLen = munColumnLength;
        mVector.push_back(tempRS);
    }
    mysql_free_result(mpResults);
    munColumnLength = 0;
    return &mVector;
}
*/
