import express from  "express"
import controller from '../controller/adminController.js'


const router = express.Router()

router.post('/addEmploy',controller.addEmploye);




router.get("/getEmployees",controller.getEmployees)


export default router  