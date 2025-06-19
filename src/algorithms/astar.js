

export function astar(grid,startNode,finishNode){
  const openSet=[];
   const visitedNodesInOrder=[];
  startNode.g=0;
  startNode.h=manhattanDistance(startNode,finishNode);
  startNode.f=startNode.g+startNode.h;
  openSet.push(startNode);
  while(openSet.length>0)
  {
      openSet.sort((a, b) => {
            if (a.f !== b.f) return a.f - b.f;
            return a.h - b.h;
        });
        const currentNode = openSet.shift();
        
        if (currentNode.isWall) continue;

        if (currentNode.isVisited) continue;

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode); 

        if (currentNode === finishNode) {
             return visitedNodesInOrder;
        }

        const neighbors = getUnvisitedNeighbors(currentNode, grid);
        for(const neighbor of neighbors)
        {
             if (neighbor.isWall) continue;

             const newG=currentNode.g+1;
             if (newG < neighbor.g) {
                neighbor.g = newG;
                neighbor.h = manhattanDistance(neighbor, finishNode);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.previousNode = currentNode;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }

  }


  // If no path found
    return visitedNodesInOrder;
};


function manhattanDistance(nodeA, nodeB) {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;

    if (row > 0) neighbors.push(grid[row - 1][col]); 
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); 
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); 

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode){
   
  const nodesInShortestPathOrder = [];
  let currentNode=finishNode;
  while(currentNode!==null)
  {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
   return nodesInShortestPathOrder;
 };