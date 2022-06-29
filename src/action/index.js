import { FILTER, PLACES,CONTACTS} from "./Types";

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

export const fetchContact = (data) => {
  return {
    type: CONTACTS,
    data,
  };
};
