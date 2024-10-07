import axios from "axios"



const api = axios.create({
    baseURL: "http://192.168.137.1:3001/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})


async function addEmploy(body) {
    try {
        const response = await api.post("/addEmploy", body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}


async function getEmployees() {
    try {
        const response = await api.get("/getEmployees")
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}
async function getEmployeesForLeads(page) {
    try {
        const response = await api.get(`/getEmployeesForLeads?page=${page}&limit=9`)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}



async function employeeLogin(body) {
    try {
        const response = await api.post("/employeeLogin", body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}


async function adminLogin(body) {
    try {
        const response = await api.post("/adminLogin",body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}

export default {
    addEmploy,
    getEmployees,
    employeeLogin,
    adminLogin,
    getEmployeesForLeads
}



