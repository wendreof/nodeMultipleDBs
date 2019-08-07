const assert = require('assert')
const api = require('./../api')
let app = {}

describe('Suíte de teste da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })
    it('Listar /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar /heroes - deve retornar somente 3 registros', async () => {
        const TAMANHO_LIMIT = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        const dados = JSON.parse(result.payload)

        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === TAMANHO_LIMIT)
    })

    it('Listar /heroes - deve retornar um erro com limit incorreto', async () => {
        const TAMANHO_LIMIT = 'AEEE'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        assert.deepEqual(result.payload, 'Erro interno no servidor')
    })

    it('Listar /heroes - deve filtrar um item', async () => {

        const NAME = 'Homem Aranha-1564706343696'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode, 200)
        assert.ok(dados[0].nome === NAME)
    })
})
