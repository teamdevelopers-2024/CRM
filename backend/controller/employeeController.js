import Employee from "../model/EmployeeDb.js"



async function employeeLogin(req,res) {
    try {
        let {userID ,password} = req.body
        console.log(req.body)
        userID = userID.toUpperCase()
        if(!userID ){
            return res.status(400).json({
                error:true,
                message:"UserID is required",
                field:"userID"
            })
        }
        if(!password){
            return res.status(400).json({
                error:true,
                message:"Password is required",
                field:"password"
            })
        }

        const employee = await Employee.findOne({employeeId:`#${userID}`})
        console.log(employee)
        if(employee){
            if(employee.Password != password){
                return res.status(400).json({
                    error:true,
                    message:"Incorrect Password",
                    field:'password',
                })
            }
            res.status(200).json({
                error:false,
                message:"employee logged In successfully",
                employeeId:employee.employeeId
            })
        }else{
            res.status(400).json({
                error:true,
                message:"user does not exists",
                field:"userID"
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internel server Error"
        })
    }
}



async function getLeads(req,res) {
    try {
        const {id} = req.body
        console.log(id)
        const employee = await Employee.findOne({employeeId:id})
        console.log(employee)
        res.status(200).json({
            error:false,
            data:employee.leads
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"Internel Server Error"
        })
    }
}




export default {
    employeeLogin,
    getLeads
}