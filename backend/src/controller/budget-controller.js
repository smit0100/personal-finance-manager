const { BudgetService } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { internalServerErrorResponse, customErrorResponse } = require('../utils/common/response-object');

class BudgetController {
    constructor() {
        this.budgetService = new BudgetService();
    }

    create = async (req, res) => {
        try {
           
            const result = await this.budgetService.create({
                userId: req.body.userId,
                amount: req.body.amount,
                category: req.body.category,
                description: req.body.description,
            });

            console.log("🚀 ~ file: budget-controller.js ~ line 30 ~ BudgetController ~ create= ~ data", result);

            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created transaction',
                err: {},
                result,
                sccuess: true
            })
            

        } catch (error) {
            console.error("🚀 ~ file: transaction-controller.js ~ line 26 ~ TransactionController ~ create= ~ error",);

            if (error.name == 'ValidationError') {
                console.log('validation error work');
                return res.status(StatusCodes.BAD_REQUEST).json(
                    customErrorResponse(error.message)
                )
            }

            if (!error.statusCode) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    internalServerErrorResponse(error.message)
                )
            }

            return res.status(error.statusCode).json(
                customErrorResponse(error.message)
            )
        }
    }

    getAllBudgetByUserId = async (req, res) => {
        try {
            const result = await this.budgetService.getAllBudgetByUserId(req.params.id);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched all transactions',
                err: {},
                result,
                sccuess: true
            })
        } catch (error) {
            if (!error.statusCode) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    internalServerErrorResponse(error.message)
                )
            }

            return res.status(error.statusCode).json(
                customErrorResponse(error.message)
            )
        }
    }

    getBudgetById = async (req, res) => {
        try {
            const result = await this.budgetService.getBudgetById(req.params.id);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched transaction',
                err: {},
                result,
                sccuess: true
            })
        } catch (error) {
            if (!error.statusCode) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    internalServerErrorResponse(error.message)
                )
            }

            return res.status(error.statusCode).json(
                customErrorResponse(error.message)
            )
        }
    }

    updateTransaction = async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json(
                    customErrorResponse('Transaction id is required')
                )
            }

            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json(
                    customErrorResponse('Please provide correct data to update')
                )
            }

            
            const result = await this.budgetService.updateBudget(id, {
                ...req.body
            });

            if (!result) {
                return res.status(StatusCodes.NOT_FOUND).json(
                    customErrorResponse('Transaction not found')
                )
            }

            return res.status(StatusCodes.OK).json({
                message: 'Successfully updated transaction',
                err: {},
                result,
                sccuess: true
            })
        } catch (error) {


            if (!error.statusCode) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    internalServerErrorResponse(error.message)
                )
            }

            return res.status(error.statusCode).json(
                customErrorResponse(error.message)
            )
        }
    }

    deleteBudget = async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json(
                    customErrorResponse('Transaction id is required')
                )
            }

            const result = await this.budgetService.deleteTransaction(id);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully deleted transaction',
                err: {},
                result,
                sccuess: true
            })
        } catch (error) {
            if (!error.statusCode) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    internalServerErrorResponse(error.message)
                )
            }

            return res.status(error.statusCode).json(
                customErrorResponse(error.message)
            )
        }
    }
}



module.exports = new BudgetController();