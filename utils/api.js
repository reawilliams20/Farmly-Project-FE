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
  
  export const getFarmById = (farm_id)=>{
    return farmlyApi.get(`/farms/${farm_id}`)
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

  export const postProduce = (newProduce) =>{
    return farmlyApi.post('/produce', newProduce)
    .then((response)=>{
      return response.data
    })
  }

  export const deleteProduce = (produce_id) => {
    return farmlyApi.delete(`/produce/${produce_id}`)
  }

  export const postUser = (newUser) => {
    return farmlyApi.post('/users', newUser)
    .then((response)=>{
      return response.data
    })
  }