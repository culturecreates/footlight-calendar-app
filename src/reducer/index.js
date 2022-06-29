import { combineReducers } from "redux";
import filter from "./FilterReducer";
import place from "./PlaceReducer"
import contact from "./ContactReducer"

export default combineReducers({
  filter,
  place,
  contact
  
});
