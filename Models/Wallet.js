const mongoose = require('mongoose');
const { Schema } = mongoose;

const walletSchema = new Schema({
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);
