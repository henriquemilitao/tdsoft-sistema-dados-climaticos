import Sequelize, {Model} from "sequelize"

class Subscription extends Model {
    static init(sequelize) {
        super.init(
            {
                email: Sequelize.STRING,
                frequency: {
                    type: Sequelize.ENUM,
                    values: ['weekly', 'biweekly', 'monthly', 'semiannually'],
                  },
            },
            {
                sequelize
            },
        )
        return this
    }
}

export default Subscription