import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { changeAlgo } from '../../redux/algoselecter/action';
import "./SelectAlgorithm.css";

const useStyle = makeStyles({
    openHeading : {
        backgroundColor : "teal",
        margin : 0,
        padding : 0,
        width : "100%",
    },
    closeHeading : {
        backgroundColor : "white",
        margin : 0,
        width : "100%",
        padding : 0
    }
})

const SelectAlgoritm = (props) => {
    const classes = useStyle();
    const [open , setOpen] = useState(false);
    const [selectedalgo , setSelectedAlgo] = useState("");
    const [options , setoptions] = useState([
        "Backtracking",
        "breadth first search",
        "depth first search",
        "greedy bfs",
        "A star"
    ]);
    const onOpen = (event)=>{
        if(!props.disable)
        setOpen(!open);
    }
    const onSelect =name=> (event)=>{
        console.log(props.algo)
        setSelectedAlgo(name);
        props.changeAlgo(name);
        setOpen(!open);
    }
    
    

    return (
        <div className="select--main">
            <div onClick={onOpen} className={open ? "select--main--heading--open select--main--heading" : "select--main--heading--close select--main--heading"}>{selectedalgo || "Algorithm"}</div>
            {open && options?.map(option=>(
                <ul className="select--ul" onClick={onSelect(option)}>{option}</ul>
            ))}
        </div>
    )
}

const mapDispatchToProp = (dispatch)=>{
    return {
        changeAlgo : (algo)=>dispatch(changeAlgo(algo)) 
    }
}
const mapStateToProp = (state)=>{
    return {
        algo : state.algo.algo
    }
}

export default  connect(mapStateToProp , mapDispatchToProp)(SelectAlgoritm)
