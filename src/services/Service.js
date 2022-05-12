import { Axios } from "../utils/ServerConfig";

export default class ServiceApi {
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
