import SubscriptionRepository from "../repositories/SubscriptionRepository"
import {v4} from 'uuid'
class SubscriptionService {
    async store(email, frequency) {
        const existingSubscription = await SubscriptionRepository.findByEmail(email)
        if (existingSubscription) {
            throw new Error('Email already subscribed')
        }
        return await SubscriptionRepository.create({ id: v4(), email, frequency })
    }

    async delete(email) {
        const existingSubscription = await SubscriptionRepository.findByEmail(email)
        if (!existingSubscription) {
            throw new Error('Email not found')
        }

        await SubscriptionRepository.deleteByEmail(email)
        return { message: 'Unsubscribed successfully' }
    }

    async index() {
        return await SubscriptionRepository.findAll()
    }
}

export default new SubscriptionService();
