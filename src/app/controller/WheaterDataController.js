import WeatherData from "../models/WheaterData";
import axios from 'axios'

class WeatherDataController {
    async store(request, response){

        const url = 'http://api.openweathermap.org/data/2.5/weather?q=Campo+Grande,MS,BR&appid=a75c4b1b2eb2a1bfb17444b8493885ba'

        const {data} = await axios.get(url)

        const tempConverted = data.main.temp - 273.15

        const idExists = await WeatherData.findOne({
            where: { id: data.id },
          })


        if (idExists) {
            
            try {
                await WeatherData.update({
                    temperature: tempConverted,
                    humidity: data.main.humidity,
                    wind_speed: data.wind.speed,
                    wind_degrees: data.wind.deg,
                    weather_description: data.weather[0].description,
                },
                {
                    where: {id: data.id}
                }
                )
            } catch (error) {
                return response.status(400).json({'error': error})
            }
        } 
        else {

            try {
                await WeatherData.create({
                    id: data.id,
                    city_name: data.name,
                    temperature: tempConverted,
                    humidity: data.main.humidity,
                    wind_speed: data.wind.speed,
                    wind_degrees: data.wind.deg,
                    weather_description: data.weather[0].description,
                })
            } catch (error) {
                return response.status(400).json({'error': error})
            }   
        }


        return response.json(data)
    }

}

export default new WeatherDataController()