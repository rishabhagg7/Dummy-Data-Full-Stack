import { Router } from "express"
import { getRandomData, getAllData, deleteAllData, deleteEmployeeData } from "../controllers/employees.controller.js";

const router = Router()

router.route('/').get(getAllData)
router.route('/add').get(getRandomData)
router.route('/deleteAll').delete(deleteAllData)
router.route('/delete/:employeeId').delete(deleteEmployeeData)

export default router;