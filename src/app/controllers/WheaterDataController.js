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

import WeatherData from "../models/WheaterData";
import axios from 'axios'

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
 *     responses:
 *       200:
 *         description: Requisição bem-sucedida. Retorna os dados climáticos adicionados ao banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WeatherData'
 */
    async store(request, response){

        const {location} = request.body

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a75c4b1b2eb2a1bfb17444b8493885ba`

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
 */
    async index(request, response) {
        // Se quiser usar a paginação, tenho que usar esses parâmetros abaixo, se não usar, já está estabelecido um padrão
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        // Calcula o offset, que é o número de itens a serem pulados
        const offset = (page - 1) * limit;

        try {
            // Aqui vai obter a contagem total de itens e os itens já paginados
            const { count, rows } = await WeatherData.findAndCountAll({
                limit: limit,
                offset: offset,
            });

            return response.json({
                page,
                limit,
                total: count, // Número total de itens no banco de dados
                data: rows    // Itens da página atual
            });
        } catch (error) {
            return response.status(500).json({ 'error': error.message });
        }
    }
}

export default new WeatherDataController()