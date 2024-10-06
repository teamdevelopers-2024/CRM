import express from  "express"
import employeController from '../controller/employeeController.js'


const router = express.Router()

router.post("/employeeLogin",employeController.employeeLogin)


export default router  