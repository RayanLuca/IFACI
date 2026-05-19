const express = require('express')
const cors = require('cors')
const api = express()

api.use(express.json())
api.use(cors())

// =========================
// 👤 USUÁRIOS
// =========================

const dados = []
let id = 0;

api.get('/usuarios', (req, res)=>{
    res.status(200).send(dados)
})

api.post('/novoUsuario',(req, res)=>{
    if(dados.length <= 0){
        id = 0;
    }

    id = id + 1;

    let user = {
        id: id,
        nome_completo: req.body.nome_completo,
        email: req.body.email,
        senha: req.body.senha
    }

    dados.push(user)

    res.status(201).send({
        code: 201,
        msg: "Usuário Criado com sucesso!"
    })
})

api.delete('/usuarios/:id', (req, res)=>{
    let idParam = parseInt(req.params.id)
    let index = dados.findIndex(p => p.id === idParam)

    if(index !== -1){
        dados.splice(index, 1);

        return res.status(200).send({
            code: 200,
            msg: "Usuário deletado com sucesso!"
        })
    }

    return res.status(404).send({
        code: 404,
        msg: "Usuário não encontrado"
    })
})

api.put('/usuarios/:id', (req, res)=>{
    let idParam = parseInt(req.params.id)
    let index = dados.findIndex(p => p.id === idParam)

    if(index !== -1){
        dados[index] = { id: idParam, ...req.body }

        return res.status(200).send({
            code: 200,
            msg: "Usuário editado com sucesso!"
        })
    }

    return res.status(404).send({
        code: 404,
        msg: "Usuário não encontrado"
    })
})


// =========================
// 📡 DISPOSITIVOS (MANUAL)
// =========================

let dispositivos = [
    {
        id: 1,
        nome: "ESP32-001",
        status: "online",
        sensores: {
            temperatura: 25,
            pressao: 1.0,
            umidade: 60,
            presenca: false,
            rele: false
        }
    },
    {
        id: 2,
        nome: "ESP32-002",
        status: "offline",
        sensores: {
            temperatura: 30,
            pressao: 1.5,
            umidade: 50,
            presenca: true,
            rele: true
        }
    }
]

// 🔍 LISTAR TODOS
api.get('/dispositivos', (req, res)=>{
    res.status(200).send(dispositivos)
})

// 🔍 PEGAR UM
api.get('/dispositivo/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const dispositivo = dispositivos.find(d => d.id === id)

    if(!dispositivo){
        return res.status(404).send({ msg: "Dispositivo não encontrado" })
    }

    res.send(dispositivo)
})

// ➕ CRIAR NOVO
api.post('/dispositivos', (req, res)=>{
    const novo = {
        id: Date.now(),
        nome: `ESP32-${Date.now()}`,
        status: "offline",
        sensores: {
            temperatura: 0,
            pressao: 0,
            umidade: 0,
            presenca: false,
            rele: false
        }
    }

    dispositivos.push(novo)

    res.status(201).send(novo)
})

// 🎮 CONTROLAR RELÉ
api.post('/rele', (req, res)=>{
    const { id, status } = req.body

    const dispositivo = dispositivos.find(d => d.id === id)

    if(!dispositivo){
        return res.status(404).send({ msg: "Dispositivo não encontrado" })
    }

    if(typeof status !== "boolean"){
        return res.status(400).send({ msg: "Use true ou false" })
    }

    dispositivo.sensores.rele = status

    res.send({ msg: `Relé ${status ? "ligado" : "desligado"}` })
})

// 🔒 CONTROLAR STATUS (MANUAL)
api.post('/conexao', (req, res)=>{
    const { id, status } = req.body

    const dispositivo = dispositivos.find(d => d.id === id)

    if(!dispositivo){
        return res.status(404).send({ msg: "Dispositivo não encontrado" })
    }

    if(status !== "online" && status !== "offline"){
        return res.status(400).send({ msg: "Use online ou offline" })
    }

    dispositivo.status = status

    res.send({
        msg: `Dispositivo ${status}`,
        dispositivo
    })
})


// =========================
// 🚀 SERVER
// =========================

const porta = 8080;
api.listen(porta, ()=>{
    console.log(`🔥 API rodando em http://localhost:${porta}`)
})