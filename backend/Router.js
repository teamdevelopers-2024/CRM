import express from  "express"
import controller from './contollers/EmployeController.js'


const router = express.Router()

router.post('/addEmploye',controller.addEmploye);



export default router