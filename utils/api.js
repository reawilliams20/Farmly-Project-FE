  import axios from "axios";
  
  const farmlyApi = axios.create({
    baseURL: "https://farmly.onrender.com/api"
  })
  

  export const getFarms = () => {
    return farmlyApi.get("/farms")
    .then((response)=>{
        return response.data
    })
  };