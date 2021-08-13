
const users = require('./users')
module.exports = {
    /**
     * Register
     *
     * @param {*} e
     * @param {*} app
     */
    register: function (e, app) {
        users(e, app);
    }
}