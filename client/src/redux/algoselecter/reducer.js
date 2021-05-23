import { CHANGE_ALGO } from "./actiontype";

const init = {
    algo : ""
}


export const SelectAlgoreducer = (state = init , action)=>{
    
    switch (action.type) {
        case CHANGE_ALGO:
            return {
                ...state ,
                algo : action.payload
            }
    
        default:
            return {...state}
    }
}