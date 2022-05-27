import { FILTER} from "./Types";

export const fetchFilter = (data) => {
  return {
    type: FILTER,
    data,
  };
};

