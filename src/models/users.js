
const mongoose = require('mongoose')

/**
 * Make model for users
 *
 * @return {*} 
 */
module.exports = () => {
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        "user_name": String,
        "created_at": Date
    });

    return mongoose.model('user', userSchema)
}
