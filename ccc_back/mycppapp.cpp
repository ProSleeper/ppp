#include <stdio.h>
int main(int argc, char* argv[]) {
    printf("arg1: %s, arg2: %s\n", argv[1], argv[2]);
    printf("arg1: %s, arg2: %s\n", "���", "�׸���");
    printf("run mycppapp\n");

    return 0;
}
