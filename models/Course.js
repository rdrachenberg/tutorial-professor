const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        createIndex: {
            unique: true
        },
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    isPublic: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
        default: false, 
    },
    creatorId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    createdAt: [{type: Date, defalt: Date.now}],
    usersEnrolled: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    
});
module.exports = Course = mongoose.model('Course', courseSchema);