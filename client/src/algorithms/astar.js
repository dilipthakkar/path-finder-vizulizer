const isSafe = (i, j, rows, cols, arr) => {
  if (i >= 0 && i < rows && j >= 0 && j < cols && arr[i][j].value != 0)
    return true;
  return false;
};

const mahantanDistance = (targetnode, currnode) => {
  const dx = Math.abs(targetnode.x - currnode.x);
  const dy = Math.abs(targetnode.y - currnode.y);
  return dx + dy;
};

export const Astar = async (
  arr,
  startX,
  startY,
  endX,
  endY,
  setBoard,
  board,
  setGrid
) => {
  // const arr = board.grid;
  const distanceArr = [];
  for (let i = 0; i < arr.length; i++) {
    const temp = [];
    for (let j = 0; j < arr[0].length; j++) {
      temp.push({
        startD: Infinity,
        endD: Infinity,
        totalD: Infinity,
      });
    }
    distanceArr.push(temp);
  }

  
  distanceArr[startX][startY].startD = 0;
  distanceArr[startX][startY].endD = mahantanDistance(
    arr[endX][endY],
    arr[startX][startY]
  );
  distanceArr[startX][startY].totalD =
    distanceArr[startX][startY].startD + distanceArr[startX][startY].endD;

  board.isSearching = true;
  setBoard({ ...board });
  const queue = [];
  const closed = [];
  const parent = [];

  for (let i = 0; i < arr.length; i++) {
    const temp = [];
    for (let j = 0; j < arr[1].length; j++) {
      temp.push(null);
    }
    parent.push(temp);
  }

  queue.push(arr[startX][startY]);
  arr[startX][startY].visited = 1;

  while (queue.length > 0) {
    const node = queue.shift();
    setBoard({ ...board, grid: arr });
    await new Promise((done) =>
      setTimeout(() => {
        done();
      }, 0)
    );

    if (node.x == endX && node.y == endY) {
      board.shortestPath = paths(startX, startY, endX, endY, parent, arr);
      await board.constructShortestPath(setGrid);
      board.isSearching = false;
      setBoard({ ...board });
      return parent;
    }

    let neighbours = node.neighbours;
    for (let i = 0; i < neighbours.length; i++) {
      if (
        isSafe(neighbours[i].x, neighbours[i].y, arr.length, arr[1].length, arr)
      ) {
        if (
          distanceArr[neighbours[i].x][neighbours[i].y].startD >
          distanceArr[node.x][node.y].startD + 1
        ) {
          distanceArr[neighbours[i].x][neighbours[i].y].startD =
            distanceArr[node.x][node.y].startD + 1;
            parent[neighbours[i].x][neighbours[i].y] = node;
        }
        distanceArr[neighbours[i].x][neighbours[i].y].endD = mahantanDistance(
          arr[endX][endY],
          arr[neighbours[i].x][neighbours[i].y]
        );
        distanceArr[neighbours[i].x][neighbours[i].y].totalD =
          distanceArr[neighbours[i].x][neighbours[i].y].startD +
          distanceArr[neighbours[i].x][neighbours[i].y].endD;


        if(arr[neighbours[i].x][neighbours[i].y].visited != 1){
            queue.push(arr[neighbours[i].x][neighbours[i].y]);
            arr[neighbours[i].x][neighbours[i].y].visited = 1;
            parent[neighbours[i].x][neighbours[i].y] = node;
        }  
        
        queue.sort((a, b) => {
            if(distanceArr[a.x][a.y].totalD ==distanceArr[b.x][b.y].totalD){
                return (
                    distanceArr[a.x][a.y].endD -
            distanceArr[b.x][b.y].endD
                );
            }
          return (
            distanceArr[a.x][a.y].totalD -
            distanceArr[b.x][b.y].totalD
          );
        });
        console.log("queue", queue);
        queue.map(e=>{
            console.log(distanceArr[e.x][e.y]);
        })
        closed.push(node);
      }
    }
  }
};

const paths = (startX, startY, endX, endY, prev, arr) => {
  let currX = endX;
  let currY = endY;
  let path = [];

  while (prev[currX][currY] != null) {
    path.push(prev[currX][currY]);
    let node = prev[currX][currY];
    currX = node.x;
    currY = node.y;
  }
  return path;
};
