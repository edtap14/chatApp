import mongoose from 'mongoose';

const GroupSchemma = mongoose.Schema({
    name: String,
    image: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

export const Group = mongoose.model('Group', GroupSchemma);
