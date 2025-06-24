import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import getMergeSort from '../algorithms/mergesort.js';
import getBubbleSort from '../algorithms/bubblesort.js';
import quicksort from '../algorithms/quicksort.js';

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('mergeSort');

  const PRIMARY_COLOR = 'turquoise';

  useEffect(() => {
    const initialArray = getInitialArray();
    setArray(initialArray);
  }, []);

  const handleRunAlgorithm = () => {
    if (selectedAlgorithm === 'mergeSort') {
      const animations = getMergeSort(array.slice());
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        if (i % 3 === 0) {
          const [firstInd, secondInd] = animations[i];
          const firstIndStyle = arrayBars[firstInd].style;
          const secondIndStyle = arrayBars[secondInd].style;
          setTimeout(() => {
            firstIndStyle.backgroundColor = 'red';
            secondIndStyle.backgroundColor = 'red';
          }, i * 1);
        }
        if (i % 3 === 1) {
          const [firstInd, secondInd] = animations[i];
          const firstIndStyle = arrayBars[firstInd].style;
          const secondIndStyle = arrayBars[secondInd].style;
          setTimeout(() => {
            firstIndStyle.backgroundColor = 'turquoise';
            secondIndStyle.backgroundColor = 'turquoise';
          }, i * 1);
        }
        if (i % 3 === 2) {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * 1);
        }
      }
    }

    if (selectedAlgorithm === 'bubbleSort') {
      const animations = getBubbleSort(array.slice());
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        if (i % 4 === 0) {
          const [firstInd, secondInd] = animations[i];
          const firstIndStyle = arrayBars[firstInd].style;
          const secondIndStyle = arrayBars[secondInd].style;
          setTimeout(() => {
            firstIndStyle.backgroundColor = 'red';
            secondIndStyle.backgroundColor = 'red';
          }, i * 1);
        }
        if (i % 4 === 1) {
          const [firstInd, secondInd] = animations[i];
          const firstIndStyle = arrayBars[firstInd].style;
          const secondIndStyle = arrayBars[secondInd].style;
          setTimeout(() => {
            firstIndStyle.backgroundColor = 'turquoise';
            secondIndStyle.backgroundColor = 'turquoise';
          }, i * 1);
        }
        if (i % 4 === 2 || i % 4 === 3) {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * 1);
        }
      }
    }

    if (selectedAlgorithm === 'quickSort') {
      const animations = quicksort(array.slice());
      const arrayBars = document.getElementsByClassName('array-bar');

      let speed = 5;
      let sortedElements = new Set();
      let totalElements = array.length;
      let lastSorted = -1;

      for (let i = 0; i < animations.length; i++) {
        const [action, ...rest] = animations[i];

        if (action === 'reset') {
          const keepIndices = new Set(rest[0].keep);

          setTimeout(() => {
            for (let k = 0; k < arrayBars.length; k++) {
              if ( keepIndices.has(k) || sortedElements.has(k))  continue;
              arrayBars[k].style.backgroundColor = 'turquoise';
            }
          }, speed * i);
        }

        else if (action === 'compare') {
          const [barOneIdx, barTwoIdx] = rest;

          setTimeout(() => {
            arrayBars[barOneIdx].style.backgroundColor = '#ff4c4c';
            arrayBars[barTwoIdx].style.backgroundColor = '#ff4c4c';
          }, speed * i);
        }

        else if (action === 'swap') {
          const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = rest;

          setTimeout(() => {
            arrayBars[barOneIdx].style.height = `${barTwoHeight}px`; 
            arrayBars[barTwoIdx].style.height = `${barOneHeight}px`;
          }, speed * i);
        }

        else if (action === 'pivot') {
          const [pivotIdx] = rest;

          setTimeout(() => {
            arrayBars[pivotIdx].style.backgroundColor = 'yellow';
          }, speed * i);
        }

        else if (action === 'pivotPlaced') {
          const [pivotIdx] = rest;
        
          setTimeout(() => {
            arrayBars[pivotIdx].style.backgroundColor = '#a64ca6';
            
          }, speed * i);
        }

        else if (action === 'sorted') {
          const [sortedIdx] = rest;
       
          
          setTimeout(() => {
            arrayBars[sortedIdx].style.backgroundColor = '#a64ca6';
             sortedElements.add(sortedIdx);
              
          }, speed * i);
        }

        if (action === 'sorted' && sortedElements.size === totalElements) {
          setTimeout(() => {
            for (let k = 0; k < arrayBars.length; k++) {
              
              arrayBars[k].style.backgroundColor = 'turquoise';
            }
          }, speed * (i + 1));
        }
      }
      setTimeout(() => {
            for (let k = 0; k < arrayBars.length; k++) {
              
              arrayBars[k].style.backgroundColor = 'turquoise';
            }
          }, speed * (animations.length));
    }
  };

  const handleGenrateArray = () => {
    const initialArray = getInitialArray();
    setArray(initialArray);
  };

  return (
    <>
      <div className='array-container' style={{ display: 'flex', alignItems: 'flex-end' }}>
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              width: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              marginLeft: '2px'
            }}
          />
        ))}
      </div>

      <div style={{
        backgroundColor: '#f0f4f8',
        padding: '12px 16px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '400px',
        gap: '20px'
      }}>
        <button style={{ padding: '8px 14px', fontSize: '14px' }} onClick={handleGenrateArray}>
          Generate New Array
        </button>

        <select
          value={selectedAlgorithm}
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          style={{ padding: '8px 14px', fontSize: '14px' }}
        >
          <option value="mergeSort">MergeSort</option>
          <option value="quickSort">QuickSort</option>
          <option value="bubbleSort">BubbleSort</option>
          <option value="insertionSort">InsertionSort</option>
          <option value="heapSort">HeapSort</option>
          <option value="selectionSort">SelectionSort</option>
        </select>

        <button style={{ padding: '8px 16px', fontSize: '14px' }} onClick={handleRunAlgorithm}>
          RUN
        </button>
      </div>
    </>
  );
}

export default SortingVisualizer;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInitialArray() {
  const a = [];
  for (let i = 1; i <= 100; i++) {
    a.push(getRandomNumber(5, 300));
  }
  return a;
}
