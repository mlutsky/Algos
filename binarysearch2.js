// 5

const binarySearch = (sortedArray, target) => {
  let lower = 0;
  let higher = sortedArray.length - 1;
  while (lower <= higher) {
    let middle = Math.floor((higher - lower)/2) + lower;
    if (sortedArray[middle] === target) {
      return true;
    } else if (sortedArray[middle] < target) {
      lower = middle + 1;
    } else {
      higher = middle - 1;
    }
  }
  return false;
}

const testArray = [1, 3, 9, 11, 15, 19, 29];
console.log(binarySearch(testArray, 11));
console.log(binarySearch(testArray, 101));