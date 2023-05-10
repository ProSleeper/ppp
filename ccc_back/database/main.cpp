#include <iostream>
#include <nlohmann/json.hpp>
#include <queue>
#include "mysql_connector.h"
using json = nlohmann::json;


// typedef struct {
//     string brand;
//     string url;
// } ProductUrl;

typedef struct {
    string b;
    ProductUrl p;
} RequestObj;

void to_json(json& j, const ProductUrl& p) { j = json{{"brand", p.brand}, {"url", p.url}}; }
void from_json(const json& j, ProductUrl& p) {
    p.brand = j["data"]["brand"];
    p.url = j["data"]["url"];
}

void to_json(json& j, const RequestObj& r) { j = json{{"behavior", r.b}, {"brand", r.p.brand}, {"url", r.p.url}}; }
void from_json(const json& j, RequestObj& r) {
    r.b = j["behavior"];
    r.p.brand = j["data"]["brand"];
    r.p.url = j["data"]["url"];
}

void result_to_json(json& j, const std::vector<ProductUrl*>* pResults){
    // if(pResults != NULL){
        MYSQL_ROW mRow;
        for(auto row : *pResults){
            j.push_back(json{{"brand", row->brand}, {"url", row->url}});
        }
}

int main(int argc, char *argv[]) {

    const string strServer = argv[1];  // where the mysql database is
    const string strUser = argv[2];     // the root user of mysql
    const string strPassword = argv[3];  // the password of the root user in mysql
    const string strDatabase = argv[4];     // the databse to pick


    MysqlConnector *mCon = new MysqlConnector(strServer, strUser, strPassword, strDatabase);

    std::vector<ProductUrl*>* result_list;
    queue<RequestObj> pQueue;
    string request;
    json recv_obj;
    json send_obj;
    RequestObj ro;

    getline(cin, request);
    recv_obj = json::parse(request);
    from_json(recv_obj, ro);
    if(ro.b == "INSERT"){
        if(mCon->Insert(ro.p)){
            cout << "Insert Success" << endl;
        }
    }
    else if(ro.b == "UPDATE"){
        if(mCon->Update(ro.p)){
            cout << "Update Success" << endl;
        }
    }
    else if(ro.b == "DELETE"){
        if(mCon->Delete(ro.p)){
            cout << "Delete Success" << endl;
        }
    }
    else if(ro.b == "SELECT"){
        //cout << ro.p.url << endl;
        result_list = mCon->Select(ro.p.url);
        result_to_json(send_obj, result_list);
        cout << send_obj << endl;
    }
    
    return 0;
}
