import Employee from "../model/EmployeeDb.js"
import validateEmployeeData from "../services/employeeValidator.js  "






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


export default{
    addEmploye,
    getEmployees
}