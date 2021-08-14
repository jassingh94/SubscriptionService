/**
 *
 *
 * @class Users
 */
class Users {
    /**
     * Creates an instance of Users.
     * @memberof Users
     */
    constructor() {

    }

    /**
     *
     *
     * @param {*} e
     * @param {*} username
     * @return {*} 
     * @memberof Users
     */
    get(e, username) {
        return e
            .model
            .users
            .findOne({
                "user_name": username
            })
    }

    /**
     *
     *
     * @param {*} e
     * @param {*} username
     * @return {*} 
     * @memberof Users
     */
    set(e, username) {
        return e
            .model
            .users
            .create({
                "user_name": username,
                "created_at": new Date()
            })
    }
}

module.exports = new Users();