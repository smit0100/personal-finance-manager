const { StatusCodes } = require('http-status-codes');
const { TransactionService } = require('../services');

const { internalServerErrorResponse,
    customErrorResponse } = require('../utils/common/response-object');
const mongoose = require('mongoose');


class TransactionController {
    constructor() {
        this.transactionService = new TransactionService();
    }
 
    create = async (req, res) => {
        try {
            const result = await this.transactionService.create({
                userId: req.body.userId,
                amount: req.body.amount,
                type: req.body.type,
                description: req.body.description,
                category: req.body.category,
            })

            console.log("🚀 ~ file: transaction-controller.js ~ line 26 ~ TransactionController ~ create= ~ data", result);

            return res.status(StatusCodes.CREATED).json({
                message: 'Successfully created transaction',
                err: {},
                result: result,
                sccuess: true
            })
        } catch (error) {
            console.error("🚀 ~ file: transaction-controller.js ~ line 26 ~ TransactionController ~ create= ~ error", );

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
    

    getAllTransactionsByUserId = async (req, res) => {
        try {
            const result = await this.transactionService.getAllTransactionsByUserId(req.params.id);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched all transactions',
                err: {},
                result: result,
                sccuess: true
            })
        } catch (error) {
            console.error("🚀 ~ file: transaction-controller.js ~ line 26 ~ TransactionController ~ create= ~ error", );

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

    getTrasactionById = async (req, res) => {
        try {
            const { id } = req.params; 

            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json(
                    customErrorResponse('Transaction id is required')
                )
            }

            const result = await this.transactionService.getTransactionById(id);

            if (!result) {
                return res.status(StatusCodes.NOT_FOUND).json(
                    customErrorResponse('Transaction not found')
                )
            }
            
            return res.status(StatusCodes.OK).json({
                message: 'Successfully fetched transaction',
                err: {},
                result: result,
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

            if (!id instanceof mongoose.Types.ObjectId) {
                return res.status(StatusCodes.BAD_REQUEST).json(
                    customErrorResponse('Transaction id is required')
                )
            }
            
            if (!req.body || Object.keys(req.body).length === 0){
                return res.status(StatusCodes.BAD_REQUEST).json(
                    customErrorResponse('Please provide correct data to update')
                )
            }

            console.log("🚀 ~ file: transaction-controller.js ~ line 26 ~ TransactionController ~ updateTransaction= ~ data", req.body);
            const result = await this.transactionService.updateTransaction(id, {
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

    deleteTransaction = async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(StatusCodes.BAD_REQUEST).json(
                    customErrorResponse('Transaction id is required')
                )
            }

            const result = await this.transactionService.deleteTransaction(id);
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

module.exports = new TransactionController();