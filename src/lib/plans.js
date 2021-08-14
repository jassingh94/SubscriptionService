/**
 *
 *
 * @class Plans
 */
class Plans {
    /**
     * Creates an instance of Plans.
     * @memberof Plans
     */
    constructor() {

    }

    /**
     *
     *
     * @param {*} e
     * @param {*} planId
     * @return {*} 
     * @memberof Plans
     */
    get(e, planId) {
        return e
            .model
            .plans
            .findOne({
                "id": planId
            })
    }

    /**
     *
     *
     * @param {*} e
     * @param {*} planId
     * @param {*} validity
     * @param {*} cost
     * @return {*} 
     * @memberof Plans
     */
    set(e, planId, validity, cost) {
        return e
            .model
            .users
            .create({
                "id": planId,
                "validity": validity,
                "cost": cost
            })
    }

    /**
     *
     *
     * @param {*} e
     * @return {*} 
     * @memberof Plans
     */
    async load(e) {
        await e.model.plans.remove({});
        await e.model.plans.insertMany(require('./resources/plans.json'));
        return true;
    }
}

module.exports = new Plans();