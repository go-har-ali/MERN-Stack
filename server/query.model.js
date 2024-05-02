const mongoose = require('mongoose');

const Query = new mongoose.Schema(
    {
        rubrics : { type: String, required: true },
        problem : { type: String, required: true },
        answer : { type: String, required: true },
        response: {type: String, required: true},
        timeStamp: { type: Date, default: Date.now() }
    },
    { collection: 'query-data' }
)

const model = mongoose.model('QueryData', Query);

module.exports = model;