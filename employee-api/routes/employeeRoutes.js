const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const controller = require('../controllers/employeeController');

router.get('/', authMiddleware, controller.getAllEmployees);
router.get('/:id', authMiddleware, controller.getEmployeeById);
router.post('/', authMiddleware, controller.createEmployee);
router.put('/:id', authMiddleware, controller.updateEmployee);
router.delete('/:id', authMiddleware, controller.deleteEmployee);

module.exports = router;
