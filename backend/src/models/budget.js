const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['USD', 'RS', 'EURO'],
        // required: true
    },
    currentSpeding: {
        type: Number,
        default: 0
    },
    startDate: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        enum: ['food', 'rent', 'salary', 'utilities', 'entertainment', 'other'],
        required: true
    },
    description: {
        type: String
    },
    // threshold: {
    //     type: Number,
    //     default: 80,
    //     min: 0,
    //     max: 100
    // }
}, {
    timestamps: true
});






BudgetSchema.post('save',  () => {
    console.log('Budget saved');
})

BudgetSchema.post('findOneAndUpdate',  () => {
    console.log('Budget updated');
});


BudgetSchema.pre('findOneAndDelete', () => {
    console.log('Budget deleted');
});


const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = Budget;