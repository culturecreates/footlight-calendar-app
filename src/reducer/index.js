import { combineReducers } from "redux";
import filter from "./FilterReducer";
import place from "./PlaceReducer"


export default combineReducers({
  filter,
  place
  
});
