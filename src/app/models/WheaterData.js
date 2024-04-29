import Sequelize, { Model } from 'sequelize'

class WeatherData extends Model{
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                  },
                city_name: Sequelize.STRING,
                temperature: Sequelize.FLOAT,
                humidity: Sequelize.INTEGER,
                wind_speed: Sequelize.FLOAT,
                wind_degrees: Sequelize.INTEGER,
                weather_description: Sequelize.STRING,
            },
            {
            sequelize,
            },
        )

        return this
    }
}

export default WeatherData