const express = require('express')
const reportController = require('../controllers/reportController');
const auth = require('../Middleware/Auth')

const router = express.Router();

router.post('/create', auth, reportController.createReport);
router.put('/update/:id', auth, reportController.updateReport);
router.delete('/delete/:id', auth, reportController.deleteReport);

module.exports = router;