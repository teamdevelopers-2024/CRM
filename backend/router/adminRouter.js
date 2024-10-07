import express from  "express"
import adminController from '../controller/adminController.js'


const router = express.Router()

router.post('/addEmploy',adminController.addEmploye);
router.post("/adminLogin",adminController.adminLogin)



router.get("/getEmployees",adminController.getEmployees)
router.get("/getEmployeesForLeads",adminController.getEmployeesForLeads)


export default router  