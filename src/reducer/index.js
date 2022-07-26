import { combineReducers } from "redux";
import filter from "./FilterReducer";
import place from "./PlaceReducer"
import contact from "./ContactReducer"
import lang from "./LangReducer"
import org from "./OrgReducer"
import audience from "./AudienceReducer"
import types from "./TypesReducer"

export default combineReducers({
  filter,
  place,
  contact,
  org,
  audience,
  types,
  lang
  
});
