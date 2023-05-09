#include <iostream>
#include <nlohmann/json.hpp>

#include "mysql_connector.h"

using json = nlohmann::json;

typedef struct {
    string brand;
    string url;
} ProductUrl;

void ltrim(std::string &str) {
    str.erase(str.begin(), std::find_if(str.begin(), str.end(), [](unsigned char ch) { return !std::isspace(ch); }));
}

int main(int argc, char *argv[]) {
    json json_object = {{"key", "value"}};
    printf("%s\n", json_object.dump().c_str());
  //  return 0;

    const string strServer = "localhost";  // where the mysql database is
    const string strUser = "u0_a177";      // the root user of mysql
    const string strPassword = "suzi123";  // the password of the root user in mysql
    const string strDatabase = "ccc";      // the databse to pick
    const string strArgv1 = argv[1];
    const string strArgv2 = argv[2];

    MysqlConnector *mCon = new MysqlConnector(strServer, strUser, strPassword, strDatabase);
    string strQuery;
    // string strSelectDataAll = "select * from product_url";
    string strInsertData = "insert into product_url(brand, url) values('" + strArgv1 + "', '" + strArgv2 + "')";
/*
    while (true) {
        cin >> strQuery;
        ltrim(strQuery);
        transform(strQuery.begin(), strQuery.end(), strQuery.begin(), ::tolower);
        strQuery.find("insert");
        mCon->Select(strQuery);
    }
*/
    mCon->Insert(strInsertData);
    // mCon->Select(strSelectDataAll);

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
