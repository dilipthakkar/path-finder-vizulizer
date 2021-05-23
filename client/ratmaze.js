const isSafe = (i, j, n, arr) => {
    if (i >= 0 && i < n && j >= 0 && j < n && arr[i][j].value != 0) return true;
    return false;
  };
// const ratinMaze = async(arr,i , j , n,solArr)=>{
//     if(i==n-1 && j==n-1){
//         return true;
//     }else if(isSafe(i,j,n,arr)){
//         solArr[i][j] = 1;
//         arr[i][j].visited = 1;
//         console.log(solArr);
//         if(isSafe(i+1,j,n,arr) && arr[i+1][j].visited==0){
//             const down = await ratinMaze(arr , i+1 , j , n , solArr);
//             if(down) return true;
//         }
//         if(isSafe(i,j+1,n,arr) && arr[i][j+1].visited==0){
//             const right = await ratinMaze(arr , i , j+1 , n , solArr);
//             if(right) return true;
//         }
//         if(isSafe(i,j-1,n,arr) && arr[i][j-1].visited==0){
//             const left = await ratinMaze(arr , i , j-1 , n , solArr);
//             if(left) return true;
//         }
//         if(isSafe(i-1,j,n,arr) && arr[i-1][j].visited==0){
//             const up = await ratinMaze(arr , i-1 , j , n , solArr);
//             if(up) return true;
//         }
//         arr[i][j].visited = 0;
//         solArr[i][j] = 0;
//     }

// }

var time=  0;
const ratinMaze = async(arr,i , j , n,solArr)=>{
    time+=100;
    
    return new Promise((resolve)=>{
        setTimeout(async() => {
            if(i==n-1 && j==n-1){
                return resolve(true);
            }else if(isSafe(i,j,n,arr)){
                arr[i][j].visited = 1;
                const newArr = [];
    for(let i=0;i<n;i++){
        const temp = [];
        for(let j =0 ; j<n;j++){
            temp.push(arr[i][j].visited);
        }
        newArr.push(temp);
    }
                console.log(newArr);

                if(isSafe(i+1,j,n,arr) && arr[i+1][j].visited==0){
                    const down = await ratinMaze(arr , i+1 , j , n , solArr);
                    console.log(i , j ,"down",  down);
                    if(down) return resolve(true);
                }
                if(isSafe(i,j+1,n,arr) && arr[i][j+1].visited==0){
                    const right = await ratinMaze(arr , i , j+1 , n , solArr);
                    console.log(i , j , "rigth" , right);
                    if(right) return resolve(true);
                }
                if(isSafe(i,j-1,n,arr) && arr[i][j-1].visited==0){

                    const left = await ratinMaze(arr , i , j-1 , n , solArr);
                    console.log(i , j , "left" , left);
                    
                    if(left) return resolve(true);
                }
                if(isSafe(i-1,j,n,arr) && arr[i-1][j].visited==0){
                    const up = await ratinMaze(arr , i-1 , j , n , solArr);
                    console.log(i , j , "up" , up);
                    
                    if(up) return resolve(true);
                }
                arr[i][j].visited = 0;
                // return resolve(false);
            
            }else{
                resolve(false);
            }
        }, time);
    })




    
}


function node(i,j){
    this.x = i;
    this.y  = j;
    this.visited  = 0 ;
    this.value  = 1;
}

const arr = [];
for(let i=0;i<5;i++){
    const temp = [];
    for(let j=0;j<5;j++){
        let newnode = new node(i,j);
        temp.push(newnode);
    }
    arr.push(temp);
}

const solArr = [];
for(let i=0;i<5;i++){
    const temp = [];
    for(let j=0;j<5;j++){
        temp.push(0);        
    }
    solArr.push(temp);
}
ratinMaze(arr,0,0,5,solArr);
