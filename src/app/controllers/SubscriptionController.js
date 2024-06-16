import SubscriptionService from "../services/SubscriptionService"
import * as Yup from 'yup'
class SubscriptionController {
    async store(request, response) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            frequency: Yup.string().oneOf(['weekly', 'biweekly', 'monthly', 'semiannually']).required(),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false });
          } catch (err) {
            return response.status(400).json({ error: err.errors });
          }

        const { email, frequency } = request.body

        try {
            const subscription = await SubscriptionService.store(email, frequency)
            return response.status(201).json(subscription)
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }

    async delete(request, response) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
          });
      
          try {
            await schema.validateSync(request.body, { abortEarly: false });
          } catch (err) {
            return response.status(400).json({ error: err.errors });
          }

        const { email } = request.params

        try {
            const result = await SubscriptionService.delete(email)
            return response.status(200).json(result)
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }
    }

    async index(request, response) {
        try {
            const subscriptions = await SubscriptionService.index()
            return response.status(200).json(subscriptions)
        } catch (error) {
            return response.status(500).json({ error: error.message })
        }
    }
}

export default new SubscriptionController()
