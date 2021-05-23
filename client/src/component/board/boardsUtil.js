let row = 20;
let col = 40;
const chnageRowsOnWindowSize = ()=>{
  if(window.innerWidth <700) {
    row = 40;
    col = 30;
  }
  else if(window.innerWidth>700 && window.innerWidth<1300){
    row = 25;
  }
}
chnageRowsOnWindowSize();


function NewNode(i, j) {
    this.x = i;
    this.y = j;
    this.dir = 0;
    this.value = 1;
    this.visited = 0;
    this.isStart = 0;
    this.isEnd = 0;
    this.neighbours = [{x:i-1 , y: j},{x:i , y: j-1},{x:i+1 , y: j},{x:i , y: j+1}]
  }
function Board(){
  
  this.grid = creategrid();
  this.startPoint = {
    x : 0,
    y : 0
  };
  this.endPoint = {
    x : this.grid.length - 1,
    y : this.grid[0].length - 1
  } ;
  this.mousepressed = false ;
  this.changingStart = false;
  this.changingEnd = false ;
  this.isSearching = false;
  this.shortestPath = [];
  this.constructShortestPath = async function(setGrid){
    for(let i=0;i<this.shortestPath.length ; i++){
      await new Promise(done=>setTimeout(() => {
        done();
      }, 3))
      this.grid[this.shortestPath[i].x][this.shortestPath[i].y].value = 3;
      setGrid(this.grid);
    }
  }
}

export const creategrid = () => {
  console.log(row , col);
    const arr = [];
    for (let i = 0; i < row; i++) {
      const arrI = [];
      for (let j = 0; j < col; j++) {
        const node = new NewNode(i, j);
        arrI.push(node);
      }
      arr.push(arrI);
    }
    const x_lim = Math.floor(arr.length/2);
    const y_lim = Math.floor(arr[0].length/2);
    arr[x_lim-1][y_lim-10].isStart = 1;
    arr[x_lim][y_lim+4].isEnd = 1;

    // arr[0][0].isStart = 1;
    
    // arr[row-1][col-1] .isEnd = 1;
    // setGrid(arr);
    return arr;
  };

export const createBoard = ()=>{
  return new Board();
} 

  const ChnageStart = (board , setBoard , i , j)=>{
    let grid = board.grid;
      for(let k=0;k<grid.length ; k++){
          for(let m=0;m<grid[k].length ; m++){
              grid[k][m].isStart = false;
          }
      }
      grid[i][j].isStart = true;
      board.startPoint.x = i ;
      board.startPoint.y = j;
      board.grid = grid;
      setBoard({...board});
        
  }

  const ChangeEnd = (board , setBoard , i , j)=>{
    let grid = board.grid;
      for(let k=0;k<grid.length ; k++){
          for(let m=0;m<grid[k].length ; m++){
              grid[k][m].isEnd = false;
          }
      }
      grid[i][j].isEnd = true;
      board.endPoint.x = i ;
      board.endPoint.y = j;
      board.grid = grid;
      setBoard({...board});
        
  }

  export const resetGird = (board , setBorad)=>{
    let grid = board.grid;
    for(let k=0;k<grid.length ; k++){
        for(let m=0;m<grid[k].length ; m++){
            grid[k][m].visited = false;
            if(grid[k][m].value==3) grid[k][m].value=1;
        }
    }
    board.grid = grid;
    setBorad({...board});
  }

  export const emptyGird = (board , setBorad)=>{
    
    let grid = board.grid;
    for(let k=0;k<grid.length ; k++){
        for(let m=0;m<grid[k].length ; m++){
            grid[k][m].visited = false;
            grid[k][m].value=1;
        }
    }
    board.grid = grid;
    setBorad({...board});
  }



  export const MouseDown = (i , j ,board , setBoard)=>{
    if(board.isSearching) return ;
    let grid = board.grid ;
    board.mousepressed = true;
    if(grid[i][j].isStart){
        board.changingStart = true;
        setBoard({...board});
    }else if(grid[i][j].isEnd){
      board.changingEnd = true;
      setBoard({...board});
  }
    else if(!grid[i][j].isStart && !grid[i][j].isEnd){
        toggleWallandSetGrid(i , j , board , setBoard);

    }
    
  }

  const toggleWallandSetGrid = ( i , j,board , setBoard ) =>{
    let grid = board.grid
    grid[i][j].value = !grid[i][j].value;
    console.log(board.grid);
    setBoard({...board});
  }

  export const MouseEnter = (i,j,board , setBoard)=>{
    if(board.isSearching) return ;

    if(board.mousepressed){
        if(board.changingStart){
            ChnageStart(board , setBoard, i , j);   
        }else if(board.changingEnd){
          ChangeEnd(board , setBoard, i , j);   
      }else{
    toggleWallandSetGrid(i , j , board , setBoard);

        }
    } 
  }

  export const Mouseup = (i,j , board , setBoard)=>{
    if(board.isSearching) return ;

    board.mousepressed = false;
    board.changingStart = false;
    board.changingEnd = false;
    setBoard({...board});
  

}

