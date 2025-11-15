// --- Day 2: Red-Nosed Reports ---
use std::fs;

fn check_safe(arr: &Vec<Vec<i32>>) -> i32 {
  let mut total_safe_reports: i32 = 0;

  for (i, report) in arr.iter().enumerate() {
    let is_safe = dampener(report, 1);
    if is_safe {
      total_safe_reports += 1;
    }

    println!(
      "Report {}: {:?} | Check: {}",
      i + 1,
      report,
      if is_safe { "Safe" } else { "Unsafe" }
    );
  }

  return total_safe_reports;
}

fn dampener(report: &Vec<i32>, level_removals_left: usize) -> bool {
  if report.len() < 2 {
    return true;
  }

  if is_report_safe(report) {
    return true;
  }

  if level_removals_left == 0 {
    return false;
  }

  for i in 0..report.len() {
    let mut modified_report = report.clone();
    modified_report.remove(i);
    if dampener(&modified_report, level_removals_left - 1) {
      return true;
    }
  }

  return false;
}

fn is_report_safe(report: &Vec<i32>) -> bool {
  if report.len() < 2 {
    return true;
  }

  let direction = if report[0] < report[1] {
    "ascending"
  } else if report[0] > report[1] {
    "descending"
  } else {
    return false;
  };

  for j in 0..report.len() - 1 {
    let diff = (report[j] - report[j + 1]).abs();

    match direction {
      "ascending" => {
        if report[j] >= report[j + 1] || diff < 1 || diff > 3 {
          return false;
        }
      }
      "descending" => {
        if report[j] <= report[j + 1] || diff < 1 || diff > 3 {
          return false;
        }
      }
      _ => unreachable!(),
    }
  }

  return true;
}

fn main() {
  let file_input = fs::read_to_string("inputs/day-2.txt").expect("Failed to read the file!");
  let puzzle_input: Vec<Vec<i32>> = file_input
    .trim()
    .lines()
    .map(|line| {
      line
        .trim()
        .split_whitespace()
        .map(|num| num.parse::<i32>().expect("Failed to parse number"))
        .collect()
    })
    .collect();
  // println!("Puzzel input...\n{:?}", &puzzle_input);

  let total_safe_reports = check_safe(&puzzle_input);
  println!("Total Safe Reports: {:?}", total_safe_reports);
}
