import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import getMergeSort from '../algorithms/mergesort.js'; 
import getBubbleSort from '../algorithms/bubblesort.js';
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
    if(selectedAlgorithm==='bubbleSort')
    {  
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
        if (i % 4 === 2) {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * 1);
        }
        if (i % 4 === 3) {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * 1);
        }
      }

    }
  }

  const handleGenrateArray = () => {
    const initialArray = getInitialArray();
    setArray(initialArray);
  }

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
          >
          </div>
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
