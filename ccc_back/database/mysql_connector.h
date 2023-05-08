#ifndef __MS_MYSQL_CONNECTOR_H__
#define __MS_MYSQL_CONNECTOR_H__

#include <mysql/mysql.h>
#include <stdio.h>
#include <stdlib.h>

#include <cstring>
#include <vector>

typedef struct {
    char **ppstrResult;
    unsigned int nLen;
} ResultSet;

class MysqlConnector {
   public:
    MysqlConnector(const char *pcServer, const char *pcUser, const char *pcPassword, const char *pcDatabase);
    ~MysqlConnector();

    bool HowNameMethod(char *sql_query);
    bool SendQuery(char *sql_query);
    void PrintQuery();
    const std::vector<ResultSet *> *GetResultSet();

   private:
    char mpcServer[64];
    char mpcUser[64];
    char mpcPassword[64];
    char mpcDatabase[64];

    std::vector<ResultSet *> mVector;
    MYSQL *mpConn;         // the connection
    MYSQL_RES *mpResults;  // the results
    MYSQL_ROW mpRow;       // the results row (line by line)
    unsigned int munColumnLength;
};

#endif  // !i
