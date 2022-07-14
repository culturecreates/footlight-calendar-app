import { combineReducers } from "redux";
import filter from "./FilterReducer";
import place from "./PlaceReducer"
import contact from "./ContactReducer"
import lang from "./LangReducer"

export default combineReducers({
  filter,
  place,
  contact,
  lang
  
});
