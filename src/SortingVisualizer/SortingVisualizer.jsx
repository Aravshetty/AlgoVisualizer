import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import getMergeSort from '../algorithms/mergesort.js';
import getBubbleSort from '../algorithms/bubblesort.js';
import quicksort from '../algorithms/quicksort.js';
import heapsort from '../algorithms/heapsort.js';

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
          }, i * 5);
        }
        if (i % 3 === 1) {
          const [firstInd, secondInd] = animations[i];
          const firstIndStyle = arrayBars[firstInd].style;
          const secondIndStyle = arrayBars[secondInd].style;
          setTimeout(() => {
            firstIndStyle.backgroundColor = 'turquoise';
            secondIndStyle.backgroundColor = 'turquoise';
          }, i * 5);
        }
        if (i % 3 === 2) {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * 5);
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
          }, i * 3);
        }
        if (i % 4 === 1) {
          const [firstInd, secondInd] = animations[i];
          const firstIndStyle = arrayBars[firstInd].style;
          const secondIndStyle = arrayBars[secondInd].style;
          setTimeout(() => {
            firstIndStyle.backgroundColor = 'turquoise';
            secondIndStyle.backgroundColor = 'turquoise';
          }, i * 3);
        }
        if (i % 4 === 2 || i % 4 === 3) {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * 3);
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

    if (selectedAlgorithm === 'heapSort') {
  const animations = heapsort(array.slice());
  const arrayBars = document.getElementsByClassName('array-bar');

  let speed = 5;
  let sortedElements = new Set();
  let totalElements = array.length;

  for (let i = 0; i < animations.length; i++) {
    const [action, ...rest] = animations[i];

    

    if (action === 'swap') {
      const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = rest;

      setTimeout(() => {
        arrayBars[barOneIdx].style.height = `${barTwoHeight}px`;
        arrayBars[barTwoIdx].style.height = `${barOneHeight}px`;

        arrayBars[barOneIdx].style.backgroundColor = 'turquoise';
        arrayBars[barTwoIdx].style.backgroundColor = 'turquoise';
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

  const handleGenerateArray = () => {
    const initialArray = getInitialArray();
    setArray(initialArray);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Top Section */}
      <div style={{ padding: '10px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
            Sorting Visualizer
          </h1>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={handleGenerateArray}>
            Generate New Array
          </button>

          <button style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: selectedAlgorithm === 'mergeSort' ? '#10b981' : '#e5e7eb', color: selectedAlgorithm === 'mergeSort' ? 'white' : '#374151', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setSelectedAlgorithm('mergeSort')}>
            MergeSort
          </button>

          <button style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: selectedAlgorithm === 'quickSort' ? '#10b981' : '#e5e7eb', color: selectedAlgorithm === 'quickSort' ? 'white' : '#374151', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setSelectedAlgorithm('quickSort')}>
            QuickSort
          </button>

          <button style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: selectedAlgorithm === 'bubbleSort' ? '#10b981' : '#e5e7eb', color: selectedAlgorithm === 'bubbleSort' ? 'white' : '#374151', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setSelectedAlgorithm('bubbleSort')}>
            BubbleSort
          </button>

          <button style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: selectedAlgorithm === 'heapSort' ? '#10b981' : '#e5e7eb', color: selectedAlgorithm === 'heapSort' ? 'white' : '#374151', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setSelectedAlgorithm('heapSort')}>
            HeapSort
          </button>

          <button style={{ padding: '8px 16px', fontSize: '14px', backgroundColor: selectedAlgorithm ? '#ef4444' : '#9ca3af', color: 'white', border: 'none', borderRadius: '8px', cursor: selectedAlgorithm ? 'pointer' : 'not-allowed', opacity: selectedAlgorithm ? 1 : 0.6 }} onClick={handleRunAlgorithm} disabled={!selectedAlgorithm}>
            RUN
          </button>
        </div>
      </div>

      {/* Bottom Section - Array Bars */}
      <div className="array-container" style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '10px' }}>
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
    </div>
  );
}

export default SortingVisualizer;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInitialArray() {
  const a = [];
  for (let i = 1; i <= 200; i++) {
    a.push(getRandomNumber(5, 300));
  }
  return a;
}
