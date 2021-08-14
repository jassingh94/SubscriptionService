const mongoose = require('mongoose');
const Users = require('./models/users')
const Plans = require('./models/plans')
const Subscriptions = require('./models/subscriptions')

const plansInstance = require('./lib/plans')

/**
 *
 *
 * @class Adapter
 */
class Adapter {
    /**
     * Creates an instance of Adapter.
     * @param {*} config
     * @memberof Adapter
     */
    constructor(config) {
        this.config = config
    }

    /**
     *
     * Initialize
     * @param {*} e
     * @return {*} 
     * @memberof Adapter
     */
    async init(e) {
        let _mongoUri = null
        if (this?.config?.args?.dev)
            _mongoUri = this.initInMemoryMongo();
        else
            _mongoUri = this.initHostedMongo();
        let db = this?.config?.env?.MONGO_DB || "subscription-service"
        _mongoUri = await _mongoUri;
        
        await mongoose.connect(`${_mongoUri}${db}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        mongoose.connection.on('error',(err)=>{
            console.log("Mongo disconnected")            
        })


        e.model.users = Users();
        e.model.plans = Plans();
        e.model.subscriptions = Subscriptions();

        //reload plans on startup
        await plansInstance.load(e)

        return true;
    }

    /**
     *
     *
     * @return {*} 
     * @memberof Adapter
     */
    initHostedMongo() {
        return Promise.resolve(this?.config?.env?.MONGO_HOST || "mongodb://localhost:27017/")
    }

    /**
     *
     *
     * @memberof Adapter
     */
    initInMemoryMongo() {

    }
}

module.exports = Adapter