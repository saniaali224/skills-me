import mongoose from 'mongoose';

const CattleSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        gender: String,
        health: String,
        weight: String,
        height: String,
        color: String,
        price: Number,
        cattlestatus: {
            type: String,
           
        },

        pastureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pasture',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Cattles', CattleSchema);
