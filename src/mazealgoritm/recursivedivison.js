



export const generateMazeRecursiveDivision = (grid, setGrid, speed = 10, startNode, finishNode) => {
  const walls = [];
  const rows = grid.length;
  const cols = grid[0].length;

  const divide = (startRow, endRow, startCol, endCol, orientation) => {
    if (endRow - startRow < 2 || endCol - startCol < 2) return;

    const horizontal = orientation === 'H';

    if (horizontal) {
      const wallRow = getRandomEven(startRow + 1, endRow - 1);
      const passageCol = getRandomOdd(startCol, endCol);

      for (let col = startCol; col <= endCol; col++) {
        if (col === passageCol) continue;
        if (isStartOrFinish(wallRow, col)) continue;
        walls.push([wallRow, col]);
      }

      divide(startRow, wallRow - 1, startCol, endCol, chooseOrientation(wallRow - startRow, endCol - startCol));
      divide(wallRow + 1, endRow, startCol, endCol, chooseOrientation(endRow - wallRow, endCol - startCol));
    } else {
      const wallCol = getRandomEven(startCol + 1, endCol - 1);
      const passageRow = getRandomOdd(startRow, endRow);

      for (let row = startRow; row <= endRow; row++) {
        if (row === passageRow) continue;
        if (isStartOrFinish(row, wallCol)) continue;
        walls.push([row, wallCol]);
      }

      divide(startRow, endRow, startCol, wallCol - 1, chooseOrientation(endRow - startRow, wallCol - startCol));
      divide(startRow, endRow, wallCol + 1, endCol, chooseOrientation(endRow - startRow, endCol - wallCol));
    }
  };

  const isStartOrFinish = (row, col) => {
    return (
      (row === startNode.row && col === startNode.col) ||
      (row === finishNode.row && col === finishNode.col)
    );
  };

  divide(0, rows - 1, 0, cols - 1, chooseOrientation(rows, cols));

  walls.forEach(([row, col], i) => {
    setTimeout(() => {
      const node = grid[row][col];
      if (!node.isStart && !node.isFinish) {
        node.isWall = true;
        setGrid([...grid]);
      }
    }, speed * i);
  });
};

const getRandomEven = (min, max) => {
  const evens = [];
  for (let i = min; i <= max; i++) if (i % 2 === 0) evens.push(i);
  return evens[Math.floor(Math.random() * evens.length)] || min;
};

const getRandomOdd = (min, max) => {
  const odds = [];
  for (let i = min; i <= max; i++) if (i % 2 === 1) odds.push(i);
  return odds[Math.floor(Math.random() * odds.length)] || min;
};

const chooseOrientation = (height, width) => {
  if (width < height) return 'H';
  if (height < width) return 'V';
  return Math.random() < 0.5 ? 'H' : 'V';
};