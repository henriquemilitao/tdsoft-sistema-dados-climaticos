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
  /**
     * @swagger
     * /weather-data:
     *   post:
     *     summary: Adiciona dados climáticos de uma localidade ao banco de dados.
     *     description: Esta rota permite adicionar os dados climáticos de uma localidade ao banco de dados. Você deve enviar o nome da localidade no corpo da requisição.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               location:
     *                 type: string
     *                 description: Nome da localidade para a qual deseja obter os dados climáticos.
     *                 example: Paris
     *     responses:
     *       200:
     *         description: Requisição bem-sucedida. Retorna os dados climáticos adicionados ao banco de dados.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/WeatherData'
     *       400:
     *         description: Requisição inválida. Verifique os dados fornecidos.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Requisição inválida. Verifique os dados fornecidos."
     */
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

    /**
     * @swagger
     * /weather-data:
     *   get:
     *     summary: Retorna todos os dados climáticos do banco de dados.
     *     description: Esta rota permite listar todos os dados climáticos armazenados no banco de dados. Caso deseje usar paginação o padrão do query params é ?page=(paginas que deseja)&limit=(numero de itens que deseja na página). O padrão é 1 e 10 respectivamente.
     *     responses:
     *       200:
     *         description: Requisição bem-sucedida. Retorna uma lista de todos os dados climáticos armazenados no banco de dados.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 page:
     *                   type: integer
     *                   description: Número da página retornada.
     *                 limit:
     *                   type: integer
     *                   description: Número máximo de itens por página.
     *                 total:
     *                   type: integer
     *                   description: Número total de itens no banco de dados.
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/WeatherData'
     *       400:
     *         description: Requisição inválida. Verifique os parâmetros fornecidos.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Requisição inválida. Verifique os parâmetros fornecidos."
     */
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