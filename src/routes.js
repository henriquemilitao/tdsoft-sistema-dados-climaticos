import { Router } from 'express'
import WheaterDataController from './app/controller/WheaterDataController'

const routes = new Router()

routes.get('/', WheaterDataController.store)

export default routes