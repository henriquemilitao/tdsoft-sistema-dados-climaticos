import SubscriptionServic from "../services/SubscriptionService"

class SubscriptionController {
    async register(request, response) {
        const { email, frequency } = request.body
        try {
            const subscription = await SubscriptionService.register(email, frequency)
            return response.status(201).json(subscription)
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }

    async unregister(request, response) {
        const { email } = request.body
        try {
            const result = await SubscriptionService.unregister(email)
            return response.status(200).json(result)
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }

    async listSubscriptions(request, response) {
        try {
            const subscriptions = await SubscriptionService.listSubscriptions()
            return response.status(200).json(subscriptions)
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }
}

export default new SubscriptionController()
