#include "mysql_connector.h"
#include <nlohmann/json.hpp>
typedef struct {
    string brand;
    string url;
} ProductUrl;

int main(int argc, char *argv[]) {
    const string strServer = "localhost";  // where the mysql database is
    const string strUser = "u0_a177";      // the root user of mysql
    const string strPassword = "suzi123";  // the password of the root user in mysql
    const string strDatabase = "ccc";      // the databse to pick
    const string strArgv1 = argv[1];
    const string strArgv2 = argv[2];

    MysqlConnector *mCon = new MysqlConnector(strServer, strUser, strPassword, strDatabase);
    string strQuery;
    string strSelectDataAll = "select * from product_url";
    string strInsertData = "insert into product_url(brand, url) values('" + strArgv1 + "', '" + strArgv2 + "')";

    // mCon->Insert(strInsertData);
    mCon->Select(strSelectDataAll);

    // mCon->SendQuery(cQuery);
    // const std::vector<ResultSet *> *rs = mCon->GetResultSet();
    // mCon->PrintQuery();

    // 유지보수 서버에서 아래 데이터를 response로 다시 클라이언트에게 전송하면 된다.
    // for (int i = 0; i < rs->size(); i++) {
    //     for (int j = 0; j < rs->at(i)->nLen; j++) {
    //         printf("%s ", rs->at(i)->ppstrResult[j]);
    //     }
    //     printf("\n");
    // }

    return 0;
}
