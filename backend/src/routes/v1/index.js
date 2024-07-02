const router = require('express').Router();
const userRouter = require('./user-routes');
const transactionRouter = require('./transaction-routes');
const budgetRouter = require('./budget-routes')

router.use('/user', userRouter);
router.use('/transaction', transactionRouter);
router.use('/budget', budgetRouter)

module.exports = router;