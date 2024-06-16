import Subscription from "../models/Subscription";

class SubscriptionRepository {
    async create(subscriptionData) {
        return await Subscription.create(subscriptionData)
    }

    async findAll() {
        return await Subscription.findAll()
    }

    async findByEmail(email) {
        return await Subscription.findOne({ where: { email } })
    }

    async deleteByEmail(email) {
        return await Subscription.destroy({ where: { email } })
    }
}

export default new SubscriptionRepository()
