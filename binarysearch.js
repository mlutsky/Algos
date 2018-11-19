function binarySearch(sortedArray, target) {
  let lower = 0;
  let higher = sortedArray.length - 1;
  // needs to be <= because they can converge on the same element
  while (lower <= higher) {
    // watch out for this - need to add lower here
    let middle = lower + Math.floor((higher - lower) / 2);
    if (sortedArray[middle] === target) {
      return true;
    } else if (sortedArray[middle] < target) {
      // can always disregard the middle because we just looked at it
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
