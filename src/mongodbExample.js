const Mongoose = require('mongoose')
Mongoose.connect('mongodb://wlf:wlf@localhost:27017/herois',
    { useNewUrlParser: true}, function(error) {
    if(!error){return;}
    else { console.log('Falha na conexão!', error)}
    });

const connection = Mongoose.connection

connection.once('open', () => console.log('database rodando!!'))
/*setTimeout(() => {
    const state = connection.readyState
    console.log('state', state)
}, 1000) */

/*
*states
* 0: Disconnected
* 1: Connected
* 2: Connecting
* 3: Disconnecting
 */

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro',
    })
    console.log('result cadastar', resultCadastrar)

    const listItens = await model.find()
    console.log('items', listItens)
}

main();
