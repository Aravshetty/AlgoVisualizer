
import React, { useEffect, useState } from 'react';
import Node from './Node/Node.jsx';
import './PathVisualizer.css';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra.js';
import { astar } from '../algorithms/astar.js';
import { generateMazeRecursiveDivision } from '../mazealgoritm/recursivedivison.js';
import { dfsRecursive } from '../algorithms/dfs.js';
import { bfs } from '../algorithms/bfs.js';

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;



function PathVisualizer() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
  const [draggingNodeType, setDraggingNodeType] = useState(null);
  const [startNode, setStartNode] = useState(null);
  const [finishNode, setFinishNode] = useState(null);

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
    setStartNode(initialGrid[START_NODE_ROW][START_NODE_COL]);
    setFinishNode(initialGrid[FINISH_NODE_ROW][FINISH_NODE_COL]);
  }, []);

  const handleRunAlgorithm = () => {
    if (!startNode || !finishNode) return;

    if (selectedAlgorithm === 'dijkstra') {
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    } else if (selectedAlgorithm === 'astar') {
      const visitedNodesInOrder = astar(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }else if (selectedAlgorithm === 'dfs-recursive') {
  const visitedNodesInOrder = dfsRecursive(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  
}
else if (selectedAlgorithm === 'bfs') {
  const visitedNodesInOrder = bfs(grid, startNode, finishNode);
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
}


  };

  const handleMouseDown = (row, col) => {
    const node = grid[row][col];

    if (node.isStart) {
      setDraggingNodeType('start');
      setMouseIsPressed(true);
      return;
    }

    if (node.isFinish) {
      setDraggingNodeType('finish');
      setMouseIsPressed(true);
      return;
    }

    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;

    const newGrid = grid.slice();

    if (draggingNodeType === 'start') {
      const prevStart = startNode;
      newGrid[prevStart.row][prevStart.col] = { ...prevStart, isStart: false };

      const newStartNode = { ...grid[row][col], isStart: true, isWall: false };
      newGrid[row][col] = newStartNode;

      setStartNode(newStartNode);
      setGrid(newGrid);
      return;
    }

    if (draggingNodeType === 'finish') {
      const prevFinish = finishNode;
      newGrid[prevFinish.row][prevFinish.col] = { ...prevFinish, isFinish: false };

      const newFinishNode = { ...grid[row][col], isFinish: true, isWall: false };
      newGrid[row][col] = newFinishNode;

      setFinishNode(newFinishNode);
      setGrid(newGrid);
      return;
    }

    const newGridWithWall = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGridWithWall);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setDraggingNodeType(null);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  };

  const handleClear = () => {
  for (let row of grid) {
    for (let node of row) {
      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (element) {
        element.className = 'node'; 
      }
    }
  }

  const initialGrid = getInitialGrid();
  setGrid(initialGrid);

  const newStartNode = initialGrid[START_NODE_ROW][START_NODE_COL];
  const newFinishNode = initialGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
  setStartNode(newStartNode);
  setFinishNode(newFinishNode);

  
  setTimeout(() => {
    const startEl = document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`);
    if (startEl) startEl.classList.add('node-start');

    const finishEl = document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`);
    if (finishEl) finishEl.classList.add('node-finish');
  }, 0);
};


 return (
  <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f7fa' }}>
    <style>
      {`
        .controls {
          background: white;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border: 1px solid #e1e8ed;
        }
        
        .button-row {
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }
        
        select {
          padding: 12px 16px;
          font-size: 16px;
          border-radius: 6px;
          border: 2px solid #e1e8ed;
          background-color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 140px;
        }
        
        select:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }
        
        button {
          padding: 12px 20px;
          font-size: 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
          min-width: 120px;
        }
        
        button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        button:active {
          transform: translateY(0);
        }
        
        .btn-run {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
        }
        
        .btn-maze {
          background: linear-gradient(135deg, #2196F3, #1976D2);
          color: white;
        }
        
        .btn-clear {
          background: linear-gradient(135deg, #f44336, #d32f2f);
          color: white;
        }
        
        .grid-container {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border: 1px solid #e1e8ed;
          display: inline-block;
        }
        
        .grid {
          border: 2px solid #333;
        }
      `}
    </style>
    
    <h1 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '28px' }}>
      Pathfinding Visualizer
    </h1>
    
    <div className="controls">
      <div className="button-row">
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setSelectedAlgorithm('dijkstra')}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              border: '2px solid #4CAF50',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              backgroundColor: selectedAlgorithm === 'dijkstra' ? '#4CAF50' : 'white',
              color: selectedAlgorithm === 'dijkstra' ? 'white' : '#4CAF50',
              transition: 'all 0.2s ease',
            }}
          >
            Dijkstra
          </button>
          <button 
            onClick={() => setSelectedAlgorithm('astar')}
            style={{
              padding: '12px 20px',
              fontSize: '16px',
              border: '2px solid #FF9800',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              backgroundColor: selectedAlgorithm === 'astar' ? '#FF9800' : 'white',
              color: selectedAlgorithm === 'astar' ? 'white' : '#FF9800',
              transition: 'all 0.2s ease',
            }}
          >
            A*
          </button>
          <button 
    onClick={() => setSelectedAlgorithm('dfs-recursive')}
    style={{
      padding: '12px 20px',
      fontSize: '16px',
      border: '2px solid #9c27b0',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '600',
      backgroundColor: selectedAlgorithm === 'dfs-recursive' ? '#9c27b0' : 'white',
      color: selectedAlgorithm === 'dfs-recursive' ? 'white' : '#9c27b0',
      transition: 'all 0.2s ease',
    }}
  >
    DFS
  </button>
  <button 
  onClick={() => setSelectedAlgorithm('bfs')}
  style={{
    padding: '12px 20px',
    fontSize: '16px',
    border: '2px solid #673ab7',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    backgroundColor: selectedAlgorithm === 'bfs' ? '#673ab7' : 'white',
    color: selectedAlgorithm === 'bfs' ? 'white' : '#673ab7',
    transition: 'all 0.2s ease',
  }}
>
  BFS
</button>

        </div>
        
        <button className="btn-run" onClick={handleRunAlgorithm}>
          Visualize {selectedAlgorithm}
        </button>
        
        <button className="btn-maze" onClick={() => generateMazeRecursiveDivision(grid, setGrid, 10, startNode, finishNode)}>
          Generate Maze
        </button>
        
        <button className="btn-clear" onClick={handleClear}>
          Clear Grid
        </button>
      </div>
    </div>
    
    <div className="grid-container">
      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} style={{ display: 'flex' }}>
            {row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
                  row={row}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>

    <div style={{ 
      background: 'white',
      padding: '15px',
      marginTop: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      border: '1px solid #e1e8ed'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50', fontSize: '18px' }}></h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: '#4CAF50', 
            border: '1px solid #333',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#555' }}>Start Node</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: '#f44336', 
            border: '1px solid #333',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#555' }}>Target Node</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: '#333', 
            border: '1px solid #333',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#555' }}>Wall</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: '#87CEEB', 
            border: '1px solid #333',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#555' }}>Visited Node</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: '#FFD700', 
            border: '1px solid #333',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#555' }}>Shortest Path</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            backgroundColor: 'white', 
            border: '1px solid #333',
            borderRadius: '3px'
          }}></div>
          <span style={{ color: '#555' }}>Empty Node</span>
        </div>
      </div>
    </div>
  </div>
);
}

export default PathVisualizer;

// Utility functions
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    g: Infinity,
    h: 0,
    f: Infinity,
    isweight:false,
  };
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  if (!grid[row] || !grid[row][col]) return grid;
  const newGrid = grid.slice();
  const node = grid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};