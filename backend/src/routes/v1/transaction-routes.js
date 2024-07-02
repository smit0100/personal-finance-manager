const router = require('express').Router();
const { TransactionController } = require('../../controller')
const { TransactionMiddleware } = require('../../middlewares')

 

router.post('/create',
    TransactionController.create
);

router.get('/transcation-userid/:id',
    TransactionController.getAllTransactionsByUserId
);

router.get('/id/:id',
    TransactionController.getTrasactionById
)

router.patch('/update/:id',
    TransactionMiddleware.validateRequestBody,
    TransactionController.updateTransaction
)

router.delete('/delete/:id',
    TransactionController.deleteTransaction
)



module.exports = router;