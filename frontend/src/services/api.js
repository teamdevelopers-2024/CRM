import axios from "axios"



const api = axios.create({
  baseURL: "http://localhost:3001/api", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})


async function addEmploy(body) {
    try {
        const response = await api.post("/addEmploy",body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }    
}


async function  getEmployees() {
    try {
        const response = await api.get("/getEmployees")
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}



export default {
    addEmploy,
    getEmployees
}



