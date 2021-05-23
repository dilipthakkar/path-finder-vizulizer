import React from 'react'
import "./node.css";
const Node = ({visited,value,node}) => {
    const classes = ()=>{
        const mainClass = "Node--node";
        if(node.isStart==1){
            return `${mainClass} start--node`
        }
        if(node.isEnd==1){
            return `${mainClass} end--node`
        }
        if(value==0 || value == false){
            return `${mainClass} wallnode`
        }
        if(value==3){
            return `${mainClass} shortest--path--node`
        }
        if(visited){
            return `${mainClass} visitednode` ;
        }else{
            return `${mainClass}` ;
            
        }
    }
    return (
        <div className={classes()} >
            
        </div>
    )
}

export default Node;