
const users = require('./users')
const subscriptions = require('./subscriptions')
module.exports = {
    /**
     * Register
     *
     * @param {*} e
     * @param {*} app
     */
    register: function (e, app) {
        users(e, app);
        subscriptions(e, app);
    }
}