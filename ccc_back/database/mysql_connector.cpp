#include "mysql_connector.h"

MysqlConnector::MysqlConnector(const char *pcServer, const char *pcUser, const char *pcPassword, const char *pcDatabase) {
    strcpy(mpcServer, pcServer);
    strcpy(mpcUser, pcUser);
    strcpy(mpcPassword, pcPassword);
    strcpy(mpcDatabase, pcDatabase);

    // first of all create a mysql instance and initialize the variables within
    mpConn = mysql_init(NULL);

    // connect to the database with the details attached.
    if (!mysql_real_connect(mpConn, mpcServer, mpcUser, mpcPassword, mpcDatabase, 0, NULL, 0)) {
        printf("Conection error : %s\n", mysql_error(mpConn));
        exit(1);
    }
}

MysqlConnector::~MysqlConnector() {
    /* clean up the database link */
    mysql_close(mpConn);
}

bool MysqlConnector::HowNameMethod(char *sql_query) {
    if (SendQuery(sql_query)) {
        PrintQuery();
        return true;
    }
    return false;
}

bool MysqlConnector::SendQuery(char *sql_query) {
    if (mysql_query(mpConn, sql_query)) {
        printf("MySQL query error : %s\n", mysql_error(mpConn));
        return false;
    }
    mpResults = mysql_use_result(mpConn);
    munColumnLength = mysql_num_fields(mpResults);
    return true;
}

void MysqlConnector::PrintQuery() {
    while ((mpRow = mysql_fetch_row(mpResults)) != NULL) {
        for (int i = 0; i < munColumnLength; i++) {
            printf("%s ", mpRow[i]);
        }
        printf("\n");
    }

    mysql_free_result(mpResults);
    munColumnLength = 0;
}

const std::vector<ResultSet *> *MysqlConnector::GetResultSet() {
    ResultSet *tempRS;
    char **tempColumn;
    char *tempStr;
    while ((mpRow = mysql_fetch_row(mpResults)) != NULL) {
        tempRS = new ResultSet;
        tempColumn = new char *[munColumnLength];
        for (int j = 0; j < munColumnLength; j++) {
            tempStr = new char[strlen(mpRow[j]) + 1];
            strcpy(tempStr, mpRow[j]);
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
