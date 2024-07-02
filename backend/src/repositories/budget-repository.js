const CrudRepository = require('./crud-repository');
const Budget = require('../models/budget');



class BudgetRepository extends CrudRepository {
    constructor() {
        super(Budget);
    }

    getAllBudgetByUserId = async (id) => {
        try {

            const result = await this.model.aggregate([
                { $match: { userId: new ObjectId(id) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'
                    },

                },
                {
                    $project: {
                        _id: 1,
                        amount: 1,
                        type: 1,
                        description: 1,
                        category: 1,
                        currency: 1,
                        userDetails: {
                            email: 1,
                            _id: 1
                        }

                    }
                }
            ])


            console.log("🚀 ~ file: transaction-repository.js ~ line 39 ~ TransactionRepository ~ getAllTransactionsByUserId= ~ result", result);

            return result;
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = BudgetRepository;