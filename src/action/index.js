import { FILTER, PLACES,CONTACTS, LANG, ORG, AUDIENCE, TYPES} from "./Types";

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

export const fetchOrg = (data) => {
  return {
    type: ORG,
    data,
  };
};

export const fetchAudience = (data) => {
  return {
    type: AUDIENCE,
    data,
  };
};

export const fetchTypes = (data) => {
  return {
    type: TYPES,
    data,
  };
};
export const changeLang = (data) => {
  return {
    type: LANG,
    data,
  };
};
