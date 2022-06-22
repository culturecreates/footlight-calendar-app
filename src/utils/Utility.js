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

  export const adminPlaces = [
    {
      name: "name",
      title:"PlaceName",
      required:true,
      placeHolder: "Enter Place Name",
      type:"geo"
    },
    {
      name: "addressCountry",
      title:"Country",
      required:true,
      placeHolder: "Enter Country",
      type:"text"
    },
    {
      name: "addressLocality",
      title:"Locality",
      required:true,
      placeHolder: "Enter Locality",
      type:"text"
    },
    {
      name: "addressRegion",
      title:"Region",
      required:true,
      placeHolder: "Enter Region",
      type:"text"
    },
    {
      name: "postalCode",
      title:"PostalCode",
      required:true,
      placeHolder: "Enter Postal code",
      type:"text"
    },
    {
      name: "streetAddress",
      title:"Street Address",
      required:true,
      placeHolder: "Enter Street Address",
      type:"text"
    },
    {
      name: "latitude",
      title:"Latitude",
      required:false,
      placeHolder: "Enter Latitude",
      type:"text"
    },
    {
      name: "longitude",
      title:"Longitude",
      required:false,
      placeHolder: "Enter Longitude",
      type:"text"
    },
    {
      name: "description",
      title:"Description",
      required:false,
      placeHolder: "Enter Description",
      type:"area"
    },
    {
      name: "containedInPlace",
      title:"ContainedInPlace",
      required:false,
      placeHolder: "Enter containedInPlace",
      type:"text"
    },
    
    
    
  ];

  export const timeZone =[
    {
      name:"Canada/Newfoundland",
      value:"Canada/Newfoundland"
    },
    {
      name:"Canada/Atlantic",
      value:"Canada/Atlantic"
    },
    {
      name:"Canada/Eastern",
      value:"Canada/Eastern"
    },
    {
      name:"Canada/Central",
      value:"Canada/Central"
    },
		{
      name:"Canada/Mountain",
      value:"Canada/Mountain"
    },	
		{
      name:"Canada/Saskatchewan",
      value:"Canada/Saskatchewan"
    },		
		{
      name:"Canada/Yukon",
      value:"Canada/Yukon"
    },	
		{
      name:"Canada/Pacific",
      value:"Canada/Pacific"
    },	
			
			
			
  ]
  export const daysOfWeek=[
      {
        name:"Monday",
        value:"Monday"
      },
      {
        name:"Tuesday",
        value:"Tuesday"
      },
      {
        name:"Wednesday",
        value:"Wednesday"
      },
      {
        name:"Thursday",
        value:"Thursday"
      },
      {
        name:"Friday",
        value:"Friday"
      },
      {
        name:"Saturday",
        value:"saturday"
      },
      {
        name:"Sunday",
        value:"sunday"
      },
    ]
  