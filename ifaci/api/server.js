const express = require("express")
const cors = require("cors")

const api = express()

api.use(express.json())
api.use(cors())

// =========================
// 👤 USUÁRIOS
// =========================

const dados = []
let id = 0

api.get("/usuarios", (req, res) => {
  res.status(200).send(dados)
})

api.post("/novoUsuario", (req, res) => {
  id++

  const user = {
    id,
    nome_completo: req.body.nome_completo,
    email: req.body.email,
    senha: req.body.senha
  }

  dados.push(user)

  res.status(201).send({
    code: 201,
    msg: "Usuário criado com sucesso!",
    user
  })
})

api.delete("/usuarios/:id", (req, res) => {
  const idParam = Number(req.params.id)
  const index = dados.findIndex(user => user.id === idParam)

  if (index === -1) {
    return res.status(404).send({
      code: 404,
      msg: "Usuário não encontrado"
    })
  }

  dados.splice(index, 1)

  res.status(200).send({
    code: 200,
    msg: "Usuário deletado com sucesso!"
  })
})

api.put("/usuarios/:id", (req, res) => {
  const idParam = Number(req.params.id)
  const index = dados.findIndex(user => user.id === idParam)

  if (index === -1) {
    return res.status(404).send({
      code: 404,
      msg: "Usuário não encontrado"
    })
  }

  dados[index] = {
    id: idParam,
    nome_completo: req.body.nome_completo,
    email: req.body.email,
    senha: req.body.senha
  }

  res.status(200).send({
    code: 200,
    msg: "Usuário editado com sucesso!",
    user: dados[index]
  })
})

// =========================
// 📡 DISPOSITIVOS
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
      temperatura: 0,
      pressao: 0,
      umidade: 0,
      presenca: false,
      rele: true
    }
  }
]

api.get("/dispositivos", (req, res) => {
  res.status(200).send(dispositivos)
})

api.get("/dispositivo/:id", (req, res) => {
  const id = Number(req.params.id)
  const dispositivo = dispositivos.find(d => d.id === id)

  if (!dispositivo) {
    return res.status(404).send({
      code: 404,
      msg: "Dispositivo não encontrado"
    })
  }

  res.status(200).send(dispositivo)
})

api.post("/dispositivos", (req, res) => {
  const novoId =
    dispositivos.length > 0
      ? Math.max(...dispositivos.map(d => d.id)) + 1
      : 1

  const novo = {
    id: novoId,
    nome: req.body.nome || `ESP32-${String(novoId).padStart(3, "0")}`,
    status: req.body.status || "offline",
    sensores: {
      temperatura: req.body.sensores?.temperatura ?? 0,
      pressao: req.body.sensores?.pressao ?? 0,
      umidade: req.body.sensores?.umidade ?? 0,
      presenca: req.body.sensores?.presenca ?? false,
      rele: req.body.sensores?.rele ?? false
    }
  }

  dispositivos.push(novo)

  res.status(201).send(novo)
})

api.delete("/dispositivos/:id", (req, res) => {
  const id = Number(req.params.id)
  const index = dispositivos.findIndex(d => d.id === id)

  if (index === -1) {
    return res.status(404).send({
      code: 404,
      msg: "Dispositivo não encontrado"
    })
  }

  dispositivos.splice(index, 1)

  res.status(200).send({
    code: 200,
    msg: "Dispositivo deletado com sucesso!"
  })
})

api.post("/rele", (req, res) => {
  const { id, status } = req.body
  const dispositivo = dispositivos.find(d => d.id === Number(id))

  if (!dispositivo) {
    return res.status(404).send({
      code: 404,
      msg: "Dispositivo não encontrado"
    })
  }

  if (typeof status !== "boolean") {
    return res.status(400).send({
      code: 400,
      msg: "Use true ou false"
    })
  }

  dispositivo.sensores.rele = status

  res.status(200).send({
    code: 200,
    msg: `Relé ${status ? "ligado" : "desligado"}`,
    dispositivo
  })
})

api.post("/conexao", (req, res) => {
  const { id, status } = req.body
  const dispositivo = dispositivos.find(d => d.id === Number(id))

  if (!dispositivo) {
    return res.status(404).send({
      code: 404,
      msg: "Dispositivo não encontrado"
    })
  }

  if (status !== "online" && status !== "offline") {
    return res.status(400).send({
      code: 400,
      msg: "Use online ou offline"
    })
  }

  dispositivo.status = status

  res.status(200).send({
    code: 200,
    msg: `Dispositivo ${status}`,
    dispositivo
  })
})

// =========================
// 🔄 SIMULAÇÃO DOS SENSORES
// =========================

function gerarNumero(min, max, casas = 1) {
  return Number((Math.random() * (max - min) + min).toFixed(casas))
}

setInterval(() => {
  dispositivos = dispositivos.map(dispositivo => {
    if (dispositivo.status === "online") {
      dispositivo.sensores.temperatura = gerarNumero(20, 40)
      dispositivo.sensores.pressao = gerarNumero(0.8, 2.5)
      dispositivo.sensores.umidade = gerarNumero(30, 90)
      dispositivo.sensores.presenca = Math.random() > 0.5
    } else {
      dispositivo.sensores.temperatura = 0
      dispositivo.sensores.pressao = 0
      dispositivo.sensores.umidade = 0
      dispositivo.sensores.presenca = false
    }

    return dispositivo
  })

  console.log("📡 Sensores atualizados automaticamente")
}, 3000)

// =========================
// 🚀 SERVER
// =========================

const porta = 8080

api.listen(porta, () => {
  console.log(`🔥 API rodando em http://localhost:${porta}`)
})