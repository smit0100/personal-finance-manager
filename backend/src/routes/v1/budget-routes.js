const router = require('express').Router();
const { BudgetController } = require('../../controller');
const budgetController = require('../../controller/budget-controller');


router.post('/create',
    budgetController.create
)

router.patch('/update/:id',
    budgetController.deleteBudget
)

router.delete('/delete/:id',
    budgetController.deleteBudget
)
// 
module.exports = router;
