import express from  "express"
import employeController from '../controller/employeeController.js'
const router = express.Router()




router.post("/employeeLogin",employeController.employeeLogin)
router.post("/getLeads",employeController.getLeads)
router.post("/closeRequest",employeController.closeRequest)

router.put("/updateLeadStatus",employeController.updateLeadStatus)

export default router  