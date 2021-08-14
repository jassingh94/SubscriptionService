
const users = require('../src/lib/users')
const moment = require('moment')
/**
 *
 *
 * @param {*} e
 * @param {*} app
 */
module.exports = (e, app) => {
    app.put('/user/:user', (req, res) => {
        users
            .get(e, req?.params?.user)
            .then(user => {
                if (!user) {
                    return users
                        .set(e, req?.params?.user)
                        .then(() => {
                            res.status(200);
                            res.send({ "status": "SUCCESS" });
                        })

                }
                else {
                    res.status(500);
                    return res.send("User already exists");
                }
            })
            .catch(err => {
                res.status(500)
                res.send(err instanceof Object ? err.message : err)
            })
    })

    app.get('/user/:user', (req, res) => {
        users
            .get(e, req?.params?.user)
            .then(user => {
                if (!user) {
                    res.status(500);
                    return res.send("User not found");
                }
                else {
                    user = {
                        user_name : user.user_name,
                        created_at : moment(user.created_at).format('YYYY-MM-DD HH:mm:ss')
                    }
                    return res.send(user);
                }
            })
            .catch(err => {
                res.status(500)
                res.send(err && err instanceof Object ? err.message : err)
            })
    })
}