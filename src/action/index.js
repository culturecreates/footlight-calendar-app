import { FILTER, PLACES} from "./Types";

export const fetchFilter = (data) => {
  return {
    type: FILTER,
    data,
  };
};

export const fetchPlace = (data) => {
  return {
    type: PLACES,
    data,
  };
};
