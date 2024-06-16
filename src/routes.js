import { Router } from 'express'
import WheaterDataController from './app/controllers/WheaterDataController'
import SubscriptionController from './app/controllers/SubscriptionController'

const routes = new Router()

routes.post('/', WheaterDataController.store)
routes.get('/', WheaterDataController.index)

routes.post('/subscriptions', SubscriptionController.store)
routes.delete('/subscriptions/:email', SubscriptionController.delete)
routes.get('/subscriptions', SubscriptionController.index)

export default routes