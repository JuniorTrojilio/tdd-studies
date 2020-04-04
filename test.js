const { deepEqual, ok } = require('assert')
const database = require('./database')
const DEFAULT_ITEM_CADASTRAR = {
    id : 0,
    name : 'Flash',
    power : 'Speed'
}

describe('Suite de manipulação de heróis', ()=>{
    before(async ()=>{
        await database.criarArquivoJson()
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR) 
    })

    it('O arquivo Json chamado herois.json deve existir', async ()=>{
        expected = true
        const result = await database.arquivoExists()
        deepEqual(result, true)
    })

    it('Deve pesquisar um herói usando arquivos', async ()=>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })

    it('Deve cadastrar um heroí, usando arquivos', async ()=>{
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(resultado)
        deepEqual(actual, expected)
    })

    it('Deve remover um heroi, usando id', async ()=>{
        const expected = true
        const result = await database.removerHeroiPorId(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })
})