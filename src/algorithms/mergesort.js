export default function getMergeSort(array) {
  const animations = [];
  mergeSort(array, 0, array.length - 1, animations);
  return animations;
}

function mergeSort(array, low, high, animations) {
  if (low >= high) {
    return;
  }

  const mid = Math.floor((low + high) / 2);
  mergeSort(array, low, mid, animations);
  mergeSort(array, mid + 1, high, animations);
  merge(array, low, mid, high, animations);
}

function merge(array, low, mid, high, animations) {
  let i = low;
  let j = mid + 1;
  const temp = array.slice();
  let k = low;

  while (i <= mid && j <= high) {
    animations.push([i, j]);
    animations.push([i, j]);

    if (temp[i] <= temp[j]) {
      array[k] = temp[i]; 
      animations.push([k, temp[i]]);
      i++;
      k++;
    } else {
      array[k] = temp[j]; 
      animations.push([k, temp[j]]);
      j++;
      k++;
    }
  }

  while (i <= mid) {
    animations.push([i, i]); 
animations.push([i, i]); 
    array[k] = temp[i]; 
    animations.push([k, temp[i]]);
    i++;
    k++;
  }

  while (j <= high) {
    animations.push([j, j]); 
animations.push([j, j]); 
    array[k] = temp[j]; 
    animations.push([k, temp[j]]);
    j++;
    k++;
  }
}
