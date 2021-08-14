const express = require('express')
const Adapter = require('./adapter')
const routes = require('./../views/routes')


module.exports = {
    app: null,
    adapter: null,
    port: 3000,
    model: {},
    /**
     *
     * Initialize engine
     * @param {*} args
     * @param {*} env
     * @return {*} 
     */
    init: function (env, args) {
        this.app = express();
        // for application json post bodies
        this.app.use(express.json());
        this.adapter = new Adapter({ args, env });
        this.port = env?.PORT || 3000;
        return Promise.all([
            //initialize adapter
            this.adapter.init(this)
        ])
            .then(() => {
                return this;
            })
    },
    /**
     * Start engine
     *
     * @return {*} 
     */
    start: function () {
        routes.register(this, this.app);
        this.app.listen(this.port);
        return Promise.resolve(true);
    }
}