import { Axios } from "../utils/ServerConfig";

export default class ServiceApi {
  static calendarInfo() {
    return Axios({
      url: `calendar-info`,
      method: "GET",
    
    });
  }
  static searchSuggesion(value) {
    return Axios({
      url: `search-suggestion`,
      method: "GET",
      params:{
        "language":"EN",
         "search-key": value
      }
    });
  }
  static eventList(page=1) {
    return Axios({
      url: `events/list`,
      method: "GET",
      params:{
          page:page,
          limit: 20
      }
    });
  }

  static getEventDetail(payload) {
    return Axios({
      url: `event/5`,
      method: "GET",

      data: JSON.stringify(payload),
    });
  }

 

  

  
}
