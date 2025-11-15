// --- Day 1: Historian Hysteria ---
import { readFileSync } from "fs";

function sortBySides(array: number[]) {
  const leftList: number[] = [];
  const rightList: number[] = [];
  array.forEach((n, index) => {
    if (index % 2 === 0) {
      leftList.push(n);
    } else {
      rightList.push(n);
    }
  });
  return { leftList, rightList };
}

function sortAscending(array: number[]): number[] {
  if (array.length <= 1) {
    return array;
  }

  const pivotIndex: number = Math.floor(array.length / 2);
  const pivot: number = array[pivotIndex];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < array.length; i++) {
    if (i === pivotIndex) continue; // skip the pivot element
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return [...sortAscending(left), pivot, ...sortAscending(right)];
}

function calcDistanceForEach(
  firstArr: number[],
  secondArr: number[],
): number[] {
  const distanceArr: number[] = [];
  const maxLenght: number = Math.max(firstArr.length, secondArr.length);

  for (let i = 0; i < maxLenght; i++) {
    const firstVal: number = firstArr[i] || 0;
    const secondVal: number = secondArr[i] || 0;
    const diff = Math.abs(firstVal - secondVal);
    distanceArr.push(diff);
  }

  return distanceArr;
}

function calcTotalDistance(arr: number[]): number {
  let sum: number = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

function calcSimilarityEach(leftList: number[], rightList: number[]): number[] {
  const similarityList: number[] = [];

  for (const leftVal of leftList) {
    let similarityScore: number = 0;

    for (const rightVal of rightList) {
      if (leftVal === rightVal) {
        similarityScore += leftVal;
      }
    }

    similarityList.push(similarityScore);
  }

  return similarityList;
}

function calcTotalSimilarity(arr: number[]): number {
  let sum: number = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

// const arrInput: number[] = [3, 4, 4, 3, 2, 5, 1, 3, 3, 9, 3, 3];
const arrInput = readFileSync("./src/utils/day-1-input.txt", "utf-8")
  .trim()
  .split("\n")
  .flatMap((line) =>
    line
      .trim()
      .split(/\s+/)
      .map((num) => Number(num)),
  );

const { leftList, rightList } = sortBySides(arrInput);
console.log("Left Side: \n", leftList);
console.log("Right Side: \n", rightList);
console.log("left length:", leftList.length);
console.log("right length:", rightList.length);

const sortedLeftList = sortAscending(leftList);
const sortedRightList = sortAscending(rightList);
console.log("Left Side Sorted: \n", sortedLeftList);
console.log("Right Side Sorted: \n", sortedRightList);

const distanceArr = calcDistanceForEach(sortedLeftList, sortedRightList);
const totalDistance = calcTotalDistance(distanceArr);
console.log("Distances between all the pairs... \n", distanceArr);
console.log("Total distance between all the pairs... \n", totalDistance);

const similarityList = calcSimilarityEach(sortedLeftList, sortedRightList);
const totalSimilarity = calcTotalSimilarity(similarityList);
console.log(
  "Similarity score for each element in left list to right list... \n",
  similarityList,
);
console.log("Total similarity between all the pairs... \n", totalSimilarity);
