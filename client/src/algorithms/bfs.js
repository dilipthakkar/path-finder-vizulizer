const isSafe = (i, j,rows , cols, arr) => {
    if (i >= 0 && i < rows && j >= 0 && j < cols && arr[i][j].value != 0) return true;
    return false;
  };
   


export const bfs = async(arr , startX , startY , endX , endY ,setBoard , board , setGrid)=>{
    board.isSearching = true;
    setBoard({...board});
    const queue = [];
    const prev = [];
    for(let i=0;i<arr.length ; i++){
        const temp = [];
        for(let j=0 ; j<arr[1].length ; j++){
            temp.push(null);
        }
        prev.push(temp);
    }
    queue.push(arr[startX][startY]);
    arr[startX][startY].visited = 1;

    while(queue.length>0){
        await new Promise(done=>setTimeout(() => {
            done();
        }, 0));
        setBoard({...board , grid : arr});

        const node = queue.shift();
        if(node.x==endX && node.y==endY){
            
            board.shortestPath = paths(startX , startY , endX, endY , prev , arr);
            board.constructShortestPath(setGrid);
            board.isSearching = false;
            setBoard({...board});
            return prev;
        }
        let neighbours = node.neighbours ;
        for(let i = 0 ; i<neighbours.length; i++){
            if( isSafe(neighbours[i].x , neighbours[i].y , arr.length , arr[1].length , arr) && arr[neighbours[i].x][neighbours[i].y].visited !=1 ){
                queue.push(arr[neighbours[i].x][neighbours[i].y]);
                arr[neighbours[i].x][neighbours[i].y].visited = 1;
                prev[neighbours[i].x][neighbours[i].y] = node;

            }
        }
    }
    board.isSearching = false;
            setBoard({...board});
    
}

const paths = (startX , startY , endX , endY , prev,arr)=>{
    let currX = endX;
    let currY = endY;
    let path = [];
   
    while(prev[currX][currY]!=null){
        path.push(prev[currX][currY]);
        let node = prev[currX][currY];
        currX = node.x;
        currY = node.y;
    }
    return path;

}


// function NewNode(i, j) {
//     this.x = i;
//     this.y = j;
//     this.dir = 0;
//     this.value = 1;
//     this.visited = 0;
//     this.isStart = 0;
//     this.isEnd = 0;
//     this.neighbours = [{x:i-1 , y: j},{x:i , y: j-1},{x:i+1 , y: j},{x:i , y: j+1}]
//   }

// const valueArr = [
//     [1,1,1,1,1],
//     [0,0,1,0,0],
//     [0,0,1,0,0],
//     [1,1,1,1,1],
//     [1,1,1,0,0],
// ]


// const creategrid = () => {
//     const arr = [];
//     for (let i = 0; i < 5; i++) {
//       const arrI = [];
//       for (let j = 0; j < 5; j++) {
//         const node = new NewNode(i, j);
//         node.value = valueArr[i][j];
//         arrI.push(node);
//       }
//       arr.push(arrI);
//     }
//     arr[0][0].isStart = 1;
//     arr[4][4] .isEnd = 1;
//     return arr;
//   };

//   const arr = creategrid();
//   bfs(arr , 0 , 0 , arr.length-1 , arr.length-1);
