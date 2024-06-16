import { Router } from 'express'
import WheaterDataController from './app/controllers/WheaterDataController'
import SubscriptionController from './app/controllers/SubscriptionController'

const routes = new Router()

routes.post('/', WheaterDataController.store)
routes.get('/', WheaterDataController.index)

routes.post('/subscriptions', SubscriptionController.register)
routes.delete('/subscriptions', SubscriptionController.unregister)
routes.get('/subscriptions', SubscriptionController.listSubscriptions)

export default routes