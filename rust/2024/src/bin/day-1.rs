// --- Day 1: Historian Hysteria ---
use std::cmp;
use std::fs;

fn sort_to_sides(array: Vec<i32>) -> (Vec<i32>, Vec<i32>) {
  let mut left_list: Vec<i32> = vec![];
  let mut right_list: Vec<i32> = vec![];

  for (index, n) in array.into_iter().enumerate() {
    if index % 2 == 0 {
      left_list.push(n);
    } else {
      right_list.push(n);
    }
  }

  return (left_list, right_list);
}

fn sort_ascending(array: Vec<i32>) -> Vec<i32> {
  if array.len() <= 1 {
    return array;
  }

  let pivot_index = array.len() / 2;
  let pivot = array[pivot_index];
  let mut left: Vec<i32> = vec![];
  let mut right: Vec<i32> = vec![];

  for i in 0..array.len() {
    if i == pivot_index {
      continue;
    } else if array[i] < pivot {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  let mut sorted: Vec<i32> = sort_ascending(left);
  sorted.push(pivot);
  sorted.extend(sort_ascending(right));
  return sorted;
}

fn calc_dist_each(first_arr: &Vec<i32>, second_arr: &Vec<i32>) -> Vec<i32> {
  let mut dist_arr: Vec<i32> = vec![];
  let max_length: usize = cmp::max(first_arr.len(), second_arr.len());

  for i in 0..max_length {
    let first_val = first_arr.get(i).copied().unwrap_or(0);
    let second_val = second_arr.get(i).copied().unwrap_or(0);
    let diff: i32 = (first_val - second_val).abs();
    dist_arr.push(diff);
  }

  return dist_arr;
}

fn calc_total_dist(arr: &Vec<i32>) -> i32 {
  let mut sum: i32 = 0;

  for i in 0..arr.len() {
    sum += arr[i];
  }

  return sum;
}

fn calc_similarity_each(left_list: &Vec<i32>, right_list: &Vec<i32>) -> Vec<i32> {
  let mut similarity_list: Vec<i32> = vec![];

  for &left_val in left_list {
    let mut similarity_score: i32 = 0;

    for &right_val in right_list {
      if left_val == right_val {
        similarity_score += left_val;
      }
    }

    similarity_list.push(similarity_score);
  }

  return similarity_list;
}

fn calc_total_similarity(arr: &Vec<i32>) -> i32 {
  let mut sum: i32 = 0;

  for i in 0..arr.len() {
    sum += arr[i];
  }

  return sum;
}

fn main() {
  let file_input = fs::read_to_string("inputs/day-1.txt").expect("Failed to read the file!");
  let arr_input: Vec<i32> = file_input
    .trim()
    .lines()
    .flat_map(|line| {
      line
        .trim()
        .split_whitespace()
        .map(|num| num.parse::<i32>())
        .collect::<Result<Vec<i32>, _>>()
    })
    .flatten()
    .collect();

  // let arr_input: Vec<i32> = vec![3, 4, 4, 3, 2, 5, 1, 3, 3, 9, 3, 3];

  let (left_list, right_list) = sort_to_sides(arr_input);
  println!("Left Side:\n{:?}", left_list);
  println!("Right Side:\n{:?}", right_list);
  println!("Left Side's length: {}", left_list.len());
  println!("Right Side's length: {}", right_list.len());

  let sorted_left_list = sort_ascending(left_list);
  let sorted_right_list = sort_ascending(right_list);
  println!("Left Side Sorted:\n{:?}", sorted_left_list);
  println!("Right Side Sorted:\n{:?}", sorted_right_list);

  let dist_arr = calc_dist_each(&sorted_left_list, &sorted_right_list);
  let total_dist = calc_total_dist(&dist_arr);
  println!("Distance between all the pairs...\n{:?}", dist_arr);
  println!("Total distance between all the pairs...\n{:?}", total_dist);

  let similarity_list = calc_similarity_each(&sorted_left_list, &sorted_right_list);
  let total_similarity = calc_total_similarity(&similarity_list);
  println!(
    "Similarity score for each element in left list to right list...\n{:?}",
    similarity_list
  );
  println!(
    "Total similarity between all the pairs...\n{:?}",
    total_similarity
  );
}
