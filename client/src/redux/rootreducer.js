import { combineReducers } from "redux";
import { SelectAlgoreducer } from "./algoselecter/reducer";

const reducer = combineReducers({
    algo : SelectAlgoreducer
});
export default reducer;