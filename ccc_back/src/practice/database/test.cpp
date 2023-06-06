#include <iostream>
#include <string>

using namespace std;

class Fixed {
   private:
    int _num;

   public:
    Fixed() : _num(0) {}
    Fixed(int num) : _num(num) {}
    Fixed& operator+(const int num) {
        _num += num;
        return *this;
    }
    Fixed operator+(const int num) const {
        Fixed newFix(_num + num);
        return newFix;
    }
    int GetNum() { return _num; }
};

Fixed operator+(int num, const Fixed& ref) { return ref + num; }

int main(int argc, const char** argv) {
    Fixed fix;
    int num = 10;

    Fixed newFix = num + fix;
    Fixed newFix2 = newFix + num;

    printf("result: %d", newFix2.GetNum());

    return 0;
}
