import React from 'react';
import './Node.css';


const Node=(props)=>{
   const {
     col,
     row,
     isStart,
     isFinish,
     isWall,
     onMouseDown,
     onMouseUp,
     onMouseEnter,


   }=props;

   const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : '';

    return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    ></div>
  );

}

export default Node;