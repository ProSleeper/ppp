#include <iostream>
#include <string>

using namespace std;


int main(int argc, const char** argv) {

#ifdef ANDROID
    cout << "andr" << endl;
#else
    cout << "linux" << endl;
#endif


    return 0;
}
