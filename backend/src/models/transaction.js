const mongoose = require('mongoose');



const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        // required: true,
        enum: ['food', 'rent', 'salary', 'utilities', 'entertainment', 'other']
    },currency: {
        type: String,
        // required: true,  
        enum:['USD','RS','EURO']
    },
}, {
    timestamps: true
});

const Transcation = mongoose.model('Transcation', TransactionSchema);

module.exports = Transcation;