#include <stdio.h>
#include <string.h>

char encrypted[] = "icnhtxjcl`bjP{`PlP}jyj}|fahr";


char* key = "givemethefla";

int main() {
  char input[28];
  printf("Enter password: ");
  scanf("%28s", input);

  for (int i = 0; i < 28; i++) {
    encrypted[i] = encrypted[i] ^ 0x0f;
  }


  if (!strcmp(input, encrypted)) {
    puts("You got it! Good job!");
    return 0;
  } else {
    puts("Incorrect. Try harder.");
    return -1;
  }
}