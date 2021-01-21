import mongoose from 'mongoose';

const PastureSchema = new mongoose.Schema(
    {
        pastureNumber: String,
        Temprature: String,
        condition:String,
       
        cattleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cattles',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('pasture', PastureSchema);
