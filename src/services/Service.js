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
  static getAllContacts() {
    return Axios({
      url: `contact-points`,
      method: "GET",
      
    });
  }
  static getAllPlaces() {
    return Axios({
      url: `all-venues`,
      method: "GET",
      params:{
        excludeContainsPlace: true
      }
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

  static getEventDetail(id,isAdmin= false,includeJsonld=true) {
    return Axios({
      url: `events/${id}`,
      method: "GET",
      params:{
        isAdmin:true,
        includeJsonld:includeJsonld
      }
    });
  }

  static getContactDetail(id) {
    return Axios({
      url: `contact-points/${id}`,
      method: "GET",
      

    });
  }
  static getPlaceDetail(id) {
    return Axios({
      url: `places/${id}`,
      method: "GET",
      

    });
  }

  static addEvent(payload) {
    return Axios({
      url: `events`,
      method: "POST",
      data: JSON.stringify(payload),

    });
  }
  static updateEvent(payload,id) {
    return Axios({
      url: `events/${id}`,
      method: "PATCH",
      data: JSON.stringify(payload),

    });
  }
  static imageUpload(id,payload,compressedFile) {
    const formdata = new FormData()
    // formdata.append("files",[payload,new File([compressedFile], "name")])
    formdata.append("files",payload)
    formdata.append("files",new File([compressedFile], "compressed"+compressedFile.name))
    return Axios({
      url: `events/${id}/image-upload`,
      method: "PATCH",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formdata

    });
  }
  
  static addPostalAddress(payload) {
    return Axios({
      url: `postal-addresses`,
      method: "POST",
      data: JSON.stringify(payload),

    });
  }

  static addContact(payload) {
    return Axios({
      url: `contact-points`,
      method: "POST",
      data: JSON.stringify(payload),

    });
  }

  static addPlace(payload) {
    return Axios({
      url: `places`,
      method: "POST",
      data: JSON.stringify(payload),

    });
  }

  static updatePostalAddress(payload,id) {
    return Axios({
      url: `postal-addresses/${id}`,
      method: "PATCH",
      data: JSON.stringify(payload),

    });
  }
  static updatePlace(payload,id) {
    return Axios({
      url: `places/${id}`,
      method: "PATCH",
      data: JSON.stringify(payload),

    });
  }

  static updateContact(payload,id) {
    return Axios({
      url: `contact-points/${id}`,
      method: "PATCH",
      data: JSON.stringify(payload),

    });
  }

  
}
