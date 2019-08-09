const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const app = new Hapi.Server({
    port: 5001

})

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    app.route([{
        path: '/herois',
        method: 'GET',
        handler: (request, head) => {
            return context.read()
        }
    }])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
}

main()
