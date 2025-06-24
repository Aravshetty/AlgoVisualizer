

export default function quicksort(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, start, end, animations) {
  if (start >= end) {
    if (start === end) {
      animations.push(["sorted", start]);
    }
    return;
  }

  let pivot = start;
  let left = start + 1;
  let right = end;

  const temp = [];

 
  temp.push(["pivot", pivot]);

  while (right >= left) {
    
    temp.push(["reset", { keep: [pivot] }]);

  
    temp.push(["compare", left, right]);

    if (array[right] < array[pivot] && array[left] > array[pivot]) {
    
      temp.push(["swap", left, right, array[left], array[right]]);
      [array[left], array[right]] = [array[right], array[left]];
    }

    if (array[right] >= array[pivot]) right--;
    if (array[left] <= array[pivot]) left++;
  }


  temp.push(["reset", { keep: [pivot] }]);
  temp.push(["compare", pivot, right]);

 
  temp.push(["swap", pivot, right, array[pivot], array[right]]);
  [array[pivot], array[right]] = [array[right], array[pivot]];

  
  temp.push(["reset", { keep: [right] }]);

 
  temp.push(["pivotPlaced", right]);

  
  temp.push(["sorted", right]);

  animations.push(...temp);

  quickSortHelper(array, start, right - 1, animations);
  quickSortHelper(array, right + 1, end, animations);
}