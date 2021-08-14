
const subscription = require('../src/lib/subscriptions')
/**
 *
 *
 * @param {*} e
 * @param {*} app
 */
module.exports = (e, app) => {


    app.post('/subscription', (req, res) => {

        if (!req?.body?.user_name) {
            res.status(500);
            return res.send({
                "state": "FAILURE",
                "msg": "'user_name' not defined."
            })
        }

        if (!req?.body?.plan_id) {
            res.status(500);
            return res.send({
                "state": "FAILURE",
                "msg": "'plan_id' not defined."
            })
        }

        if (!req?.body?.start_date) {
            res.status(500);
            return res.send({
                "state": "FAILURE",
                "msg": "'start_date' not defined."
            })
        }

        subscription
            .set(e, req?.body?.user_name, req?.body?.plan_id, req?.body?.start_date)
            .then(status => {
                res.status(200)
                return res.send(status)
            })
            .catch(err => {
                res.status(500)
                return res.send(err instanceof Object && err.message ? err.message : err)
            })
    })

}