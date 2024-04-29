import Sequelize from 'sequelize'

import WheaterData from '../app/models/WheaterData'

import configDataBase from '../config/database'

const models = [WheaterData]

class DataBase {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(configDataBase)
    models.map((model) => model.init(this.connection))
  }
}

export default new DataBase()
