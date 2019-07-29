const assert = require('assert');
const MongoDB = require('./../db/strategies/mongodb');
const Context = require('./../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const context = new Context(new MongoDB());
describe('MongoDB Suíte de testes', function () {
    this.beforeAll(async () => {
        await context.connect()
    })
    it('Vefificar a conexão', async() => {
        const result = await context.isConnected()
        console.log('result', result)
        const expected = 'Connected'

        assert.deepEqual(result, expected)
    })

    it('Cadastrar', async () => {
        const {nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
})
