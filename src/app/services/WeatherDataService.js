import axios from "axios"
import WeatherData from "../models/WheaterData"

class WeatherDataService {
    async fetchWeatherData(location) {

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a75c4b1b2eb2a1bfb17444b8493885ba`
        const { data } = await axios.get(url)
        const tempConverted = parseFloat((data.main.temp - 273.15).toFixed(2));

        
        return {
            id: data.id,
            city_name: data.name,
            temperature: tempConverted,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            wind_degrees: data.wind.deg,
            weather_description: data.weather[0].description,
        }
    }

    async saveOrUpdateWeatherData(weatherData) {
        const idExists = await WeatherData.findOne({ where: { id: weatherData.id } })
    
        if (idExists) {
          return await WeatherData.update(weatherData, { where: { id: weatherData.id } })
        } else {
          return await WeatherData.create(weatherData)
        }
      }

    async getAllWeatherData(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const { count, rows } = await WeatherData.findAndCountAll({ limit, offset })

        return { page, limit, total: count, data: rows }
    }

    async getWeatherDataById(id) {
        return await WeatherData.findByPk(id)
    }
}

export default new WeatherDataService()