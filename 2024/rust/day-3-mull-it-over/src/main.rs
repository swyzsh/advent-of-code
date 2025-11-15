use std::fs;

fn mul(a: i32, b: i32) -> i32 {
  return a * b;
}

fn cleanMul(dirty_str: String) -> i32 {
  return 0;
}

fn main() {
  let file_input = fs::read_to_string("./test-input.txt").expect("Failed to read the file!");

  println!("Test Input:\n{}", file_input);
}
