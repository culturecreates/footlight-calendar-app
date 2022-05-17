import Item from "antd/lib/list/Item";
import { Axios } from "../utils/ServerConfig";
import moment from "moment";

export default class ServiceApi {
  static convertDate =(date)=>{
    const [day, month, year] =  date.split(' ')
        return `${year}-${month}-${day}`
    // dd/mm/yyyy
    
  }
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
  static eventList(page=1,filterArray=[],queryString) {
    console.log(filterArray,filterArray.find((o) => o.type === "Date")&&this.convertDate(filterArray.find((o) => o.type === "Date").name))
    return Axios({
      url: `events/list`,
      method: "GET",
      params:{
          page:page,
          limit: 20,
          audiences:filterArray.filter(item=>item.type === "Public").map(item=>item.name),
          types:filterArray.filter(item=>item.type === "Type").map(item=>item.name),
          venues:[],
          query:queryString, 
          organizations:[],
          range: filterArray.find((o) => o.type === "Date")&&this.convertDate(filterArray.find((o) => o.type === "Date").name)
          
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
