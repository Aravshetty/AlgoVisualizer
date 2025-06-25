export default function heapsort(array) {
  const animations = [];
  heapSortHelper(array, animations);
  return animations;
}

function heapSortHelper(array, animations) {
  const n = array.length;

 
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

 
  for (let i = n - 1; i > 0; i--) {
    
    animations.push(["compare", 0, i]);
    animations.push(["swap", 0, i, array[0], array[i]]);

    
    [array[0], array[i]] = [array[i], array[0]];

    
    animations.push(["sorted", i]);

    
    heapify(array, i, 0, animations);
  }

  
  animations.push(["sorted", 0]);
}

function heapify(array, n, i, animations) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  
  if (left < n) {
    animations.push(["compare", largest, left]);
    if (array[left] > array[largest]) {
      largest = left;
    }
  }

 
  if (right < n) {
    animations.push(["compare", largest, right]);
    if (array[right] > array[largest]) {
      largest = right;
    }
  }

 
  if (largest !== i) {
    animations.push(["swap", i, largest, array[i], array[largest]]);
    [array[i], array[largest]] = [array[largest], array[i]];

    heapify(array, n, largest, animations);
  }
}
