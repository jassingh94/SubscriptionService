
/**
 *
 *
 * @param {*} e
 * @param {*} app
 */
module.exports = (e, app) => {
    app.put('/user/:user', (req, res) => {
        e
            .model
            .users
            .findOne({
                "user_name": req?.params?.user
            })
            .then(user => {
                if (!user) {
                    return e
                        .model
                        .users
                        .create({
                            "user_name": req?.params?.user,
                            "created_at": new Date()
                        })
                        .then(() => {
                            res.status(200);
                            res.send({ "status": "SUCESS" });
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
        e
            .model
            .users
            .findOne({
                "user_name": req?.params?.user
            })
            .then(user => {
                if (!user) {
                    res.status(500);
                    return res.send("User not found");
                }
                else {
                    return res.send(user);
                }
            })
            .catch(err => {
                res.status(500)
                res.send(err && err instanceof Object ? err.message : err)
            })
    })
}