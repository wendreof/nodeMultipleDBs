const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = `MEU_SEGREDÃO_123`

const app = new Hapi.Server({
    port: 5000

})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    const swaggerOptions = {
        info: {
            title: `API Herois - #CursoNodeBR`,
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        //options: {
         //   expiresIn: 20
       // }
        validate: (dado, request) =>{
            //verfica no banco se o usuário continua ativo e pagando

            return {
                isValid: true // caso inválido false
            }
        }
    })
    app.auth.default('jwt')
    app.route([
            ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
            ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
        ]
    )

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}

module.exports = main()
