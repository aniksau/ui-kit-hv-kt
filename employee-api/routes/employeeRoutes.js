const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const controller = require('../controllers/employeeController');

// Full route paths declared directly here
router.get('/', authMiddleware, controller.getAllEmployees);
router.get('/:id', authMiddleware, controller.getEmployeeById);
router.post('/', authMiddleware, controller.createEmployee);
router.put('/:id', authMiddleware, controller.updateEmployee);
router.delete('/:id', authMiddleware, controller.deleteEmployee);

module.exports = router;
