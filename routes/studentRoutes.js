const express = require('express');
const router = express.Router();
const { createStudent, getAllStudents } = require('../controllers/studentController');

router.post('/', createStudent);       
router.get('/', getAllStudents);     

module.exports = router;
