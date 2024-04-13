const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataControllers');

router.get('/', dataController.getAll);
router.get('/all-data', dataController.getAllData);
router.get('/single-data/:id', dataController.getDataById);
router.post('/add-comments',dataController.postComments)
router.post('/add-reply',dataController.postReplies)
router.post('/add-feedback',dataController.postFeedback)
router.put('/edit-feedback/:id',dataController.editDataById)
router.delete('/delete-feedback/:id',dataController.deleteDataById)

module.exports = router