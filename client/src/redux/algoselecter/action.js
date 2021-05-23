import { CHANGE_ALGO } from "./actiontype";

export const changeAlgo = (algo)=>{
    return dispatch=>{
        dispatch({
            type : CHANGE_ALGO,
            payload : algo
        });
    }
}