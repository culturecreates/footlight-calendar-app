export const adminSideMenuLinks = [
    {
      name: "Events",
      link: "/admin/events",
    },
    {
      name: "Places",
      link: "/admin/places",
    },
    
    
  ];
  export const convertDateFormat=(dateString)=>{
    if(dateString)
     return dateString.split("-").reverse().join("-");
    else
      return dateString 
  }