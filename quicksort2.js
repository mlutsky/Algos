var _ = require("lodash");

const quickSort = array => {
  if (array.length <= 1) {
    return array;
  }

  let pivot = array[array.length - 1];
  let swaps = 0;
  for (let i = 0; i < array.length - swaps - 1; ) {
    if (array[i] > pivot) {
      let temp = array[i];
      array.splice(i, 1);
      array.push(temp);
      swaps++;
    } else {
      i++;
    }
  }

  return (
    quickSort(array.splice(0, array.length - swaps - 1)) +
    [pivot] +
    quickSort(array.splice(array.length - swaps, array.length))
  );
};

const mergeSort = array => {

  if (array.length > 1) {
    let middle = Math.floor(array.length / 2);

    return merge(
      mergeSort(array.slice(0, middle)),
      mergeSort(array.slice(middle, array.length))
    );
  } else {
    return array;
  }
};

const merge = (array1, array2) => {
  if (!array1 && !array2) {
    return null;
  } else if (array1 && !array2) {
    return array1;
  } else if (!array1 && array2) {
    return array2;
  } else {
    let array3 = [];
    let [index1, index2] = [0, 0];

    // case where both arrays have index left
    while (index1 < array1.length && index2 < array2.length) {
      if (array1[index1] < array2[index2]) {
        array3.push(array1[index1]);
        index1++;
      } else {
        array3.push(array2[index2]);
        index2++;
      }
    }

    while (index1 < array1.length) {
      array3.push(array1[index1]);
      index1++;
    }
    while (index2 < array2.length) {
      array3.push(array2[index2]);
      index2++;
    }
    return array3;
  }
};

const array = [6, 5, 3, 1, 8, 7, 2, 4];
// console.log(quickSort(array));
console.log(mergeSort(array));
