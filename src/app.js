import express from 'express'
import routes from './routes'
import configureSwagger from '../swaggerConfig'
import './database'

class App {
    constructor() {
        this.app = express()

        this.middlewares()
        this.routes()
        this.configureSwagger()
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use(routes)
    }

    configureSwagger() {
        configureSwagger(this.app)
    }
}

export default new App().app