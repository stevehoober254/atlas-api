const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['deposit', 'withdrawal'],
        default: 'deposit',
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['success', 'pending', 'failed'],
        default: 'pending'
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
    note: {
        type: String,
        default: ''
    },
    mpesaReceiptID: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
