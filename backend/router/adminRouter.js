import express from  "express"
import adminController from '../controller/adminController.js'


const router = express.Router()

router.post('/addEmploy',adminController.addEmploye);
router.post("/adminLogin",adminController.adminLogin)
router.post("/individualAssign",adminController.individualAssign)


router.get("/getEmployees",adminController.getEmployees)
router.get("/getEmployeesForLeads",adminController.getEmployeesForLeads)
router.get("/getCloseRequests", adminController.getCloseRequests)


export default router  