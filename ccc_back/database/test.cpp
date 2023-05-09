#include <algorithm>
#include <iostream>
#include <string>

using namespace std;

void ltrim(std::string& str) {
    str.erase(str.begin(), std::find_if(str.begin(), str.end(), [](unsigned char ch) { return !std::isspace(ch); }));
}

bool checkQuery(string& str) {
    ltrim(str);
    transform(str.begin(), str.end(), str.begin(), ::tolower);
    std::string sub = str.substr(0, 6);
    size_t pos = sub.find("insert");
    if (pos != std::string::npos) {
        // 검색어가 발견된 경우의 처리
        // ...
        cout << "insert found" << endl;
    }
}

int main(int argc, const char** argv) {
    string strSelectDataAll = "select * from product_url";
    string strInsertData = "INSERT INTO PRODUCT_URL(BRAND, URL) VALUES('')";
    checkQuery(strInsertData);
    // std::string str = "insert this string";

    return 0;
}
