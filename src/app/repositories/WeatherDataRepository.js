import WeatherData from "../models/WheaterData"

class WeatherDataRepository {
  async findById(id) {
    return await WeatherData.findByPk(id)
  }

  async findAll({ limit, offset }) {
    const { count, rows } = await WeatherData.findAndCountAll({ limit, offset })
    return { count, rows }
  }

  async findByLocation(location) {
    return await WeatherData.findOne({ where: { location } })
  }

  async create(weatherData) {
    return await WeatherData.create(weatherData)
  }

  async update(id, weatherData) {
    return await WeatherData.update(weatherData, { where: { id } })
  }
}

export default new WeatherDataRepository()
