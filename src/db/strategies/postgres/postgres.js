const Sequelize = require('sequelize');
const ICrud = require('./../interfaces/interfaceCrud');

class Postgres extends ICrud {
    constructor(connection, schema) {
        super();
        this._connection = connection;
        this._schema = schema;

    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        )
        await model.sync();
        return model
    }

    async IsConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (e) {
            console.log('fail!', e);
            return false;
        }
    }

    async create(item) {
        const {
            dataValues
        } = await this._schema.create(item);

        return dataValues
    }

    async update(id, item) {
        return this._schema.update(item, {where: {id: id}})
    }

    async delete(id) {
        const query = id ? {id} : {}
        return this._schema.destroy({where: query})
    }

    async read(item = {}) {
        return this._schema.findAll({where: item, raw: true})
    }

    static async connect() {
        const connection = new Sequelize(
            'heroes',
            'wlf',
            'password',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
            },
        );
        return connection
    }
}

module.exports = Postgres;
