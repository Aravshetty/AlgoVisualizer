export function dfsRecursive(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const found = { value: false }; 
  dfsHelper(startNode, grid, visitedNodesInOrder, finishNode, found);
  return visitedNodesInOrder;
}

function dfsHelper(node, grid, visitedNodesInOrder, finishNode, found) {
  if (!node || node.isWall || node.isVisited || found.value) return;

  node.isVisited = true;
  visitedNodesInOrder.push(node);

  if (node === finishNode) {
    found.value = true;
    return;
  }

  const neighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.previousNode = node;
    dfsHelper(neighbor, grid, visitedNodesInOrder, finishNode, found);
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);       
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);  
  if (col > 0) neighbors.push(grid[row][col - 1]);         
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); 

  return neighbors.filter(n => !n.isVisited && !n.isWall);
}
