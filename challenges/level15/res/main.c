#include <stdio.h>
#include <string.h>

int main() {
  char input[28];
  printf("Enter password: ");
  scanf("%28s", input);

  if (!strcmp(input, "flag{easy_c_crackme}")) {
    puts("You got it! Good job!");
    return 0;
  } else {
    puts("Incorrect. Try harder.");
    return -1;
  }
}