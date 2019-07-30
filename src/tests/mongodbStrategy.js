const assert = require('assert');
const MongoDB = require('./../db/strategies/mongodb');
const Context = require('./../db/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super teia'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino-${Date.now()}`,
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = ``

const context = new Context(new MongoDB());
describe('MongoDB Suíte de testes', function () {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id;
    })

    it('Vefificar a conexão', async () => {
        const result = await context.isConnected()
        console.log('result', result)
        const expected = 'Connected'

        assert.deepEqual(result, expected)
    })

    it('Cadastrar', async () => {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })

    it('Listar', async () => {
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
          const result = {
             nome, poder
          }
          assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('Atualizar', async() => {
        console.log('MOCK_HEROI_ID', MOCK_HEROI_ID)
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Perna longa'
        })
        assert.deepEqual(result.nModified, 1)
    })
})
