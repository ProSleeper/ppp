#include <cstdio>
#include <iostream>
#include <string>

using namespace std;

int main(int argc, const char** argv) {
    string aaa = "123";
    string bbb = aaa;

    aaa = "ccc0";
    cout << aaa << endl;
    cout << bbb << endl;

    return 0;
}