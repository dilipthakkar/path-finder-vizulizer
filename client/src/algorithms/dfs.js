const isSafe = (i, j,rows , cols, arr) => {
    if (i >= 0 && i < rows && j >= 0 && j < cols && arr[i][j].value != 0) return true;
    return false;
  };
   


export const dfs = async(arr , startX , startY , endX , endY ,setBoard , board , setGrid)=>{
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

        const node = queue[queue.length-1];
        if(node.x==endX && node.y==endY){
            
            board.shortestPath = paths(startX , startY , endX, endY , prev , arr);
            board.constructShortestPath(setGrid);
            board.isSearching = false;
            setBoard({...board});
            return prev;
        }
        let neighbours = node.neighbours ;
        let flag = true;
        for(let i = 0 ; i<neighbours.length; i++){
            if( isSafe(neighbours[i].x , neighbours[i].y , arr.length , arr[1].length , arr) && arr[neighbours[i].x][neighbours[i].y].visited !=1 ){
                queue.push(arr[neighbours[i].x][neighbours[i].y]);
                arr[neighbours[i].x][neighbours[i].y].visited = 1;
                prev[neighbours[i].x][neighbours[i].y] = node;
                flag = false;
                break;
            }
        }
        if(flag){
            queue.pop();
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

