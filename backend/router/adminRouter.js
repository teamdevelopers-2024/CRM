import express from  "express"
import controller from '../controller/adminController.js'


const router = express.Router()

router.post('/addEmploye',controller.addEmploye);



export default router  