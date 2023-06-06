#ifndef __MS_MYSQL_CONNECTOR_H__
#define __MS_MYSQL_CONNECTOR_H__

#ifdef __ANDROID__
    #include <mariadb/mysql.h> //termux
#else
    #include <mysql/mysql.h> //linux
#endif


#include <stdio.h>
#include <stdlib.h>

#include <string>
#include <vector>

using namespace std;

typedef struct p {
    string brand;
    string url;
} ProductUrl;

// typedef struct {
//     string *pstrResult;
//     unsigned int nLen;
// } ResultSet;

class MysqlConnector {
   public:
    MysqlConnector(const string strServer, const string strUser, const string strPassword, const string strDatabase);
    ~MysqlConnector();

    bool Insert(const ProductUrl& data);
    std::vector<ProductUrl *> *Select(const string strQuery);
    bool Update(const ProductUrl &data);
    bool Delete(const ProductUrl& data);
    bool SendQuery(const string str_url);
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

    std::vector<ProductUrl *> m_result_list;
    MYSQL *mpConn;         // the connection
    MYSQL_RES *mpResults;  // the results
    MYSQL_ROW mRow;        // the results row (line by line)
    unsigned int munColumnLength;
};

#endif  // !i
