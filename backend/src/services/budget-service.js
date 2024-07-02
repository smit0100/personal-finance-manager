const { BudgetRepository } = require('../repositories');

 
class BudgetService {
    constructor() {
        this.budgetRepository = new BudgetRepository();
    }

    create = async (data) => {
        try {
            console.log('service file data', data);
            return await this.budgetRepository.create(data);
            
            
        } catch (error) {
            throw error;
        }
    }

    getAllBudgetByUserId = async (id) => {
        try {
            return await this.budgetRepository.getAllBudgetByUserId(id);
        } catch (error) {
            throw error;
        }
    }

    getBudgetById = async (id) => {
        try {
            return await this.budgetRepository.get(id);
        } catch (error) {
            throw error;
        }
    }

    updateBudget = async (id, data) => {
        try {
            const result = await this.budgetRepository.update(id, data);
            return result;
        } catch (error) {
            throw error;
        }
    }

    deleteTransaction = async (id) => {
        try {
            return await this.budgetRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = BudgetService;

