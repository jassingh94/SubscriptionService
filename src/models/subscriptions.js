
const mongoose = require('mongoose')

/**
 * Make model for subscriptions
 *
 * @return {*} 
 */
module.exports = () => {
    const Schema = mongoose.Schema;

    const subscriptionSchema = new Schema({
        "user_name": String,
        "plan_id":String,
        "start_date": Date,
        "end_date": Date
    });

    return mongoose.model('subscription', subscriptionSchema)
}
