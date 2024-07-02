const { TransactionRepository } = require('../repositories');
const ValidationError = require('../utils/error/validation-error');

class TransactionService {
    constructor() {
        this.transactionRepository = new TransactionRepository();
    }

    create = async (data) => {
        try {
            return await this.transactionRepository.create(data);

        } catch (error) {
            throw error;
        }
    }

    getAllTransactionsByUserId = async (id) => {
        try {
            return await this.transactionRepository.getAllTransactionsByUserId(id);
        } catch (error) {
            throw error;
        }
    }

    getTransactionById = async (id) => {
        try {
            return await this.transactionRepository.get(id);
        } catch (error) {
            throw error;
        }
    }

    updateTransaction = async (id, data) => {
        try {
            const result = await this.transactionRepository.update(id, data);

        } catch (error) {
            throw error;
        }
    }

    deleteTransaction = async (id) => {
        try {
            return await this.transactionRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionService;