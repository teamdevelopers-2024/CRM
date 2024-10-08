import axios from "axios"



const api = axios.create({
    baseURL: "https://crm-psi-sepia.vercel.app/api",
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


async function getEmployees({ page, limit, search }) {
    try {
        const response = await api.get(`/getEmployees?limit=${limit}&&page=${page}&&search=${search}`)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}
async function getEmployeesForLeads(page) {
    try {
        const response = await api.get(`/getEmployeesForLeads?page=${page}&limit=18`)
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
        const response = await api.post("/adminLogin", body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}


async function individualAssign(body) {
    try {
        const response = await api.post("/individualAssign", body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : "internel Server Error"
    }
}

async function getLeads(id, page) {
    try {
        console.log("id from getleads ", id)
        const response = await api.post(`/getLeads`, { id: id, page: page })
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}


async function updateLeadStatus(body) {
    try {
        const response = await api.put("/updateLeadStatus", body)
        return response.data
    } catch (error) {
        console.log(error)
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}



async function closeRequest(body) {
    try {
        const response = await api.post("/closeRequest", body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}


async function getCloseRequests() {
    try {
        const response = await api.get("/getCloseRequests")
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}


async function getRequestesCount() {
    try {
        const response = await api.get("/getRequestesCount")
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}


async function approveRequest(body) {
    try {
        const response = await api.put('/approveRequest', body)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response ? error.response.data : 'Internel Server Error'
    }
}

async function handleReject(body) {
    try {
        const response = await api.put("/handleReject",body)
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
    getEmployeesForLeads,
    individualAssign,
    getLeads,
    updateLeadStatus,
    closeRequest,
    getCloseRequests,
    getRequestesCount,
    approveRequest,
    handleReject
}



