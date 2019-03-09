import java.util.*;

public class Main {
  public static void main(String[] args) {
    Scanner s = new Scanner(System.in);

    System.out.print("Please enter the password: ");
    String input = s.nextLine();

    int[] encrypted = new int[]{0x66, 0x6c, 0x61, 0x67, 0x7b, 0x6a, 0x61, 0x76, 0x61, 0x5f, 0x6a, 0x61, 0x76, 0x61, 0x5f, 0x4a, 0x41, 0x56, 0x41, 0x7d};
    
    String flag = "";
    for (int b : encrypted) {
      flag += (char)b;
    }

    if (input.equals(flag)) {
      System.out.println("Good job! You got it.");
    } else {
      System.out.println("Incorrect. Try harder.");
    }
  }
}