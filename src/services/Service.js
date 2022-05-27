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
  static searchSuggesion(value,lng) {
    return Axios({
      url: `search-suggestion`,
      method: "GET",
      params:{
        "language":lng,
         "search-key": value
      }
    });
  }
  static eventList(page=1,filterArray=[],lng) {
    console.log(filterArray,filterArray.find((o) => o.type === "queryString")&&filterArray.find((o) => o.type === "queryString").name)
    return Axios({
      url: `events/list`,
      method: "GET",
      params:{
         "language":lng,
          page:page,
          limit: 20,
          audiences:filterArray.filter(item=>(item.type === "Public" || item.type === "audiences")).map(item=>item.name),
          types:filterArray.filter(item=>(item.type === "Type" || item.type === "types")).map(item=>item.name),
          venues: filterArray.filter(item=>(item.type === "places" || item.type === "Region")).map(item=>item.name),
          query:filterArray.find((o) => o.type === "queryString")&&filterArray.find((o) => o.type === "queryString").name, 
          organizations: filterArray.filter(item=>item.type === "organizations").map(item=>item.name),
          "date-filter": filterArray.find((o) => o.type === "Date")&&this.convertDate(filterArray.find((o) => o.type === "Date").name)
          
      }
    });
  }

  static getEventDetail(id) {
    return Axios({
      url: `events/${id}`,
      method: "GET",

    });
  }

 

  

  
}
