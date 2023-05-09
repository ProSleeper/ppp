#ifndef __MS_MYSQL_CONNECTOR_H__
#define __MS_MYSQL_CONNECTOR_H__

//#include <mysql/mysql.h>
#include <mariadb/mysql.h> //termux
#include <stdio.h>
#include <stdlib.h>

#include <string>
#include <vector>

using namespace std;

typedef struct {
    string *pstrResult;
    unsigned int nLen;
} ResultSet;

class MysqlConnector {
   public:
    MysqlConnector(const string strServer, const string strUser, const string strPassword, const string strDatabase);
    ~MysqlConnector();

    bool Insert(const string strQuery);
    const vector<ResultSet *> *Select(const string strQuery);
    bool Update(const string strQuery);
    bool Delete(const string strQuery);

    bool SendQuery(const string strQuery);
    /*
    bool HowNameMethod(const string sql_query);
    bool SendQuery(const string sql_query);
    void PrintQuery();
    const std::vector<ResultSet *> *GetResultSet();
    */
   private:
    const string mstrServer;
    const string mstrUser;
    const string mstrPassword;
    const string mstrDatabase;

    std::vector<ResultSet *> m_result_list;
    MYSQL *mpConn;         // the connection
    MYSQL_RES *mpResults;  // the results
    MYSQL_ROW mRow;        // the results row (line by line)
    unsigned int munColumnLength;
};

#endif  // !i
