/**
 * 
 * /weather-data:
 *   get:
 *     summary: Retorna dados climáticos.
 *     description: Retorna uma lista de dados climáticos.
 *     responses:
 *       200:
 *         description: Requisição bem-sucedida. Retorna uma lista de dados climáticos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WeatherData'
 */

 import WeatherDataService from '../services/WeatherDataService'

class WeatherDataController {
    async store(request, response){

        const {location} = request.body

        try {
            const weatherData = await WeatherDataService.fetchWeatherData(location);
            await WeatherDataService.saveOrUpdateWeatherData(weatherData);
      
            return response.json(weatherData);
          } catch (error) {
            return response.status(400).json({ error: error.message });
          }
        }

    async index(request, response) {
        // Se quiser usar a paginação, tenho que usar esses parâmetros abaixo, se não usar, já está estabelecido um padrão
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        try {
            const weatherData = await WeatherDataService.getAllWeatherData(page, limit);
            return response.json(weatherData);
            
          } catch (error) {
            return response.status(500).json({ error: error.message });
          }
    }

    async show(request, response) {
        const { id } = request.params;
    
        try {
          const weatherData = await WeatherDataService.getWeatherDataById(id);
    
          if (!weatherData) {
            return response.status(404).json({ error: 'Data not found' });
          }
    
          return response.json(weatherData);
        } catch (error) {
          return response.status(500).json({ error: error.message });
        }
      }
}

export default new WeatherDataController()