import express from 'express';
import groupController from '../controllers/groupController';

const router = express.Router();

router.get('/:id', groupController.getGroupById);
router.get('/', groupController.getAllGroups);

module.exports = router;
