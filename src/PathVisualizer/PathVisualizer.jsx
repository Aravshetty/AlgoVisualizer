
import React, { useEffect, useState } from 'react';
import Node from './Node/Node.jsx';
import './PathVisualizer.css';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra.js';
import { astar } from '../algorithms/astar.js';

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
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
    setStartNode(initialGrid[START_NODE_ROW][START_NODE_COL]);
    setFinishNode(initialGrid[FINISH_NODE_ROW][FINISH_NODE_COL]);
  };

  return (
    <>
      <select
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
        style={{ padding: '8px', fontSize: '16px', marginRight: '16px' }}
      >
        <option value="dijkstra">Dijkstra</option>
        <option value="astar">A*</option>
      </select>
      <button onClick={handleRunAlgorithm} style={{ marginRight: '16px' }}>
        Visualize {selectedAlgorithm}
      </button>
      <button onClick={handleClear}>Clear Grid</button>

      <div className="grid">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
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
    </>
  );
}

export default PathVisualizer;

// Utility Functions
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
