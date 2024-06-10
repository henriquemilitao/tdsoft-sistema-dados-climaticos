import { Router } from 'express'
import WheaterDataController from './app/controllers/WheaterDataController'

const routes = new Router()

routes.post('/', WheaterDataController.store)

routes.get('/', WheaterDataController.index)

export default routes