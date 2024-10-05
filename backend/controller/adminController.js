import Employee from "../model/EmployeeDb.js"
import validateEmployeeData from "../services/employeeValidator.js  "
import 'dotenv/config'





async function addEmploye(req,res) {
  try {
    const data = req.body
    const result = await validateEmployeeData(data)
    if(result.valid==false){
       return res.status(400).json({
            error:true ,
            message:result.message
        })
    }


    await Employee.create(data)
    res.status(200).json({
        error:false,
        message:"employee added successfully"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
        error:true ,
        message:"Internel Server Error"
    })
  }
}



async function getEmployees(req,res) {
    try {
        const result = await Employee.find().sort({_id:-1})
        res.status(200).json({
            error:false,
            data:result
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true ,
            message:"Internel Server Error"
        })
    }
}


async function adminLogin(req,res) {
    try {
        const {username , password} = req.body
        console.log(req.body)
        if(username == process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD){
            return res.status(200).json({
                error:false,
                message:"admin logged in successfully",
                role:"admin"
            })
        } else if(username == process.env.SUPERADMIN_USERNAME && process.env.SUPERADMIN_PASSWORD == password){
            return res.status(200).json({
                error:false,
                message:"super admin logged in successfully",
                role:"superadmin"
            })
        }else {
            res.status(400).json({
                error:true ,
                message:"invalid credentials"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true ,
            message:"Internel Server Error"
        })
    }    
}


export default{
    addEmploye,
    getEmployees,
    adminLogin
}