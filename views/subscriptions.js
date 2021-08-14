
const subscription = require('../src/lib/subscriptions')
const moment = require('moment')
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

    app.get('/subscription/:user/:date', (req, res) => {
        let date = req?.params?.date
        date = moment.utc(date)
        if (!date.isValid()) {
            res.status(500);
            return res.send("Invalid date provided")
        }

        subscription
            .get(e, req?.params?.user, {
                end_date: {
                    "$gte": date.toDate()
                },
                start_date: {
                    "$lte": date.toDate()
                }
            })
            .then(status => {
                res.status(200)

                if (status) {
                    status = {
                        plan_id: status.plan_id,
                        days_left: moment.utc(status.end_date).diff(date, 'days')
                    }
                }
                return res.send(status || {})
            })
            .catch(err => {
                res.status(500)
                return res.send(err instanceof Object && err.message ? err.message : err)
            })


    })

    app.get('/subscription/:user', (req, res) => {
        subscription
            .getMany(e, req?.params?.user)
            .then(status => {
                res.status(200)
                if (status)
                    status = status.map(d => ({
                        plan_id: d.plan_id,
                        start_date: moment.utc(d.start_date).format('YYYY-MM-DD'),
                        valid_till: moment.utc(d.end_date).format('YYYY-MM-DD')
                    }))
                return res.send(status || [])
            })
            .catch(err => {
                res.status(500)
                return res.send(err instanceof Object && err.message ? err.message : err)
            })

    })

}