const mongoose = require('mongoose');

const Query = new mongoose.Schema(
    {
        input: { type: String, required: true },
        output: { type: String, required: true },
        timeStamp: { type: Date, default: Date.now() }
    },
    { collection: 'query-data' }
)

const model = mongoose.model('QueryData', Query);

module.exports = model;