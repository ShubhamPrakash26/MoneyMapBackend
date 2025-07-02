import express from 'express';
import { createTransaction, getTransactionsByUserId , deleteTransaction, } from '../controllers/transactionsController.js';
import { getSummaryByUserId } from '../controllers/summaryController.js';

const router = express.Router();

router.get("/:userId", getTransactionsByUserId)

router.post("/", createTransaction)

router.delete("/:id", deleteTransaction)

router.get('/summary/:userId', getSummaryByUserId)

export default router;