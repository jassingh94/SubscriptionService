
const mongoose = require('mongoose')

/**
 * Make model for plans
 *
 * @return {*} 
 */
module.exports = () => {
    const Schema = mongoose.Schema;

    const planSchema = new Schema({
        "id": String,
        "validity": Schema.Types.Mixed,
        "cost": Number
    });

    return mongoose.model('plan', planSchema)
}
