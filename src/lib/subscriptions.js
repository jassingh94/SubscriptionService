const moment = require('moment');
const users = require('./users')
const plans = require('./plans')

/**
 *
 *
 * @class Subscriptions
 */
class Subscriptions {
    /**
     * Creates an instance of Subscriptions.
     * @memberof Subscriptions
     */
    constructor() {
        global.DATE_INFINITE = 1e15
    }

    /**
     *
     *
     * @param {*} e
     * @param {*} username
     * @param {*} [where={}]
     * @return {*} 
     * @memberof Subscriptions
     */
    get(e, username, where = {}) {
        return e
            .model
            .subscriptions
            .findOne({
                "user_name": username,
                ...where
            })
    }

    /**
     *
     *
     * @param {*} e
     * @param {*} user_name
     * @param {*} plan_id
     * @param {*} start_date
     * @return {*} 
     * @memberof Subscriptions
     */
    set(e, user_name, plan_id, start_date) {

        // convert date
        start_date = moment.utc(start_date)
        // check if date is valid
        if (!start_date.isValid())
            return Promise.reject({
                "state": "FAILURE",
                "msg": "Invalid Start Date"
            })

        // check user exists
        return checkIfUserExists(e, user_name)
            .then(user => {
                // if user exist get plan info
                return getPlan(e, plan_id)
            })
            .then(plan => {
                // if plan exists, identify end date
                let end_date = null;
                // if end date is infinite
                if (typeof plan.validity === "string" && plan.validity.toLowerCase() === "infinite")
                    end_date = moment(DATE_INFINITE);
                // if validity is valid number
                else if (!isNaN(Number(plan.validity))) {
                    end_date = moment.utc(start_date).add(plan.validity, 'days')
                }
                // throw error
                else {
                    return Promise.reject("Invalid validity for plan")
                }

                // check if already subscribed to plan
                return this
                    .get(e, user_name, { plan_id })
                    .then(subscription => {
                        // if not subscribed, add subscription
                        if (!subscription) {
                            return e
                                .model
                                .subscriptions
                                .create({
                                    user_name,
                                    plan_id,
                                    start_date,
                                    end_date
                                })
                                .then(() => {
                                    // return amount
                                    return Promise.resolve(plan.cost * -1)
                                })
                        }
                        else 
                            return Promise.reject("Already subscribed to plan")
                    })


            })
            .then(amount => {
                return Promise.resolve({
                    "state": "SUCCESS",
                    amount
                })
            })
            .catch(err => {
                return Promise.reject({
                    "state": "FAILURE",
                    msg: err
                })
            })

    }
}

/**
 *
 *
 * @param {*} e
 * @param {*} username
 * @return {*} 
 */
function checkIfUserExists(e, username) {
    return users
        .get(e, username)
        .then(user => {
            if (!user)
                return Promise.reject('User does not exist');
            return user;
        })
}


/**
 *
 *
 * @param {*} e
 * @param {*} planid
 * @return {*} 
 */
function getPlan(e, planid) {
    return plans
        .get(e, planid)
        .then(plan => {
            if (!plan)
                return Promise.reject('Invalid plan id');
            return plan;
        })
}

module.exports = new Subscriptions();