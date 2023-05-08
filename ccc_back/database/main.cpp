#include "mysql_connector.h"

int main(int argc, char *argv[]) {
    const char *mpcServer = "localhost";  // where the mysql database is
    const char *mpcUser = "u0_a177";      // the root user of mysql
    const char *mpcPassword = "suzi123";  // the password of the root user in mysql
    const char *mpcDatabase = "ccc";      // the databse to pick

    MysqlConnector *mCon = new MysqlConnector(mpcServer, mpcUser, mpcPassword, mpcDatabase);
    char cQuery[512];
    char cSelectDataAll[] = "select * from product_url";

    char cWhere[128];
    int nFindNumber = 1;
    sprintf(cWhere, "WHERE D.id = %d ", nFindNumber);  // cWhere�� "" �� ���ڿ��� �ϸ� ��ü ��ȸ
    sprintf(cWhere, "");                               // ��ü ��ȸ
    sprintf(cQuery, "%s%s", cSelectDataAll, cWhere);

    mCon->SendQuery(cQuery);
    const std::vector<ResultSet *> *rs = mCon->GetResultSet();

    // �������� �������� �Ʒ� �����͸� response�� �ٽ� Ŭ���̾�Ʈ���� �����ϸ� �ȴ�.
    for (int i = 0; i < rs->size(); i++) {
        for (int j = 0; j < rs->at(i)->nLen; j++) {
            printf("%s ", rs->at(i)->ppstrResult[j]);
        }
        printf("\n");
    }

    return 0;
}
