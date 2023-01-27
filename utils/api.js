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

  export const getProduce = () =>{
    return farmlyApi.get('/produce')
    .then((response)=>{
      return response.data
    })
  }

  export const getUsers = () => {
    return farmlyApi.get("/users")
    .then((res) => {
      return res.data
    })
  }