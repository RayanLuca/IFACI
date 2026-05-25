"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Dispositivo = {
  id: number
  nome: string
  status: string
  sensores: {
    temperatura: number
    pressao: number
    umidade: number
    presenca: boolean
    rele: boolean
  }
}

export default function DashboardDispositivo() {
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])
  const [loading, setLoading] = useState(false)
  const [editando, setEditando] = useState<Dispositivo | null>(null)

  const [nome, setNome] = useState("")
  const [status, setStatus] = useState("offline")
  const [temperatura, setTemperatura] = useState(0)
  const [pressao, setPressao] = useState(0)
  const [umidade, setUmidade] = useState(0)
  const [presenca, setPresenca] = useState(false)
  const [rele, setRele] = useState(false)

  const router = useRouter()

  async function carregarDados() {
    try {
      const res = await fetch("http://localhost:8080/dispositivos")
      const data = await res.json()
      setDispositivos(data)
    } catch (err) {
      console.error("Erro ao carregar dados:", err)
    }
  }

  useEffect(() => {
    carregarDados()
    const intervalo = setInterval(carregarDados, 3000)
    return () => clearInterval(intervalo)
  }, [])

  async function acao(url: string, body: any) {
    setLoading(true)

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      await carregarDados()
    } catch (err) {
      console.error("Erro na ação:", err)
    }

    setLoading(false)
  }

  async function promoverAlteracao() {
    setLoading(true)

    try {
      const novoNumero = dispositivos.length + 1

      await fetch("http://localhost:8080/dispositivos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: `ESP32-${String(novoNumero).padStart(3, "0")}`,
          status: "offline",
          sensores: {
            temperatura: 0,
            pressao: 0,
            umidade: 0,
            presenca: false,
            rele: false
          }
        })
      })

      await carregarDados()
    } catch (err) {
      console.error("Erro ao adicionar dispositivo:", err)
    }

    setLoading(false)
  }

  function abrirEdicao(dados: Dispositivo) {
    setEditando(dados)
    setNome(dados.nome)
    setStatus(dados.status)
    setTemperatura(dados.sensores.temperatura)
    setPressao(dados.sensores.pressao)
    setUmidade(dados.sensores.umidade)
    setPresenca(dados.sensores.presenca)
    setRele(dados.sensores.rele)
  }

  async function atualizarDispositivo() {
    if (!editando) return

    setLoading(true)

    try {
      await fetch(`http://localhost:8080/dispositivos/${editando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          status,
          sensores: {
            temperatura,
            pressao,
            umidade,
            presenca,
            rele
          }
        })
      })

      setEditando(null)
      await carregarDados()
    } catch (err) {
      console.error("Erro ao atualizar dispositivo:", err)
    }

    setLoading(false)
  }

  async function deletarDispositivo(id: number) {
    setLoading(true)

    try {
      await fetch(`http://localhost:8080/dispositivos/${id}`, {
        method: "DELETE"
      })

      await carregarDados()
    } catch (err) {
      console.error("Erro ao deletar dispositivo:", err)
    }

    setLoading(false)
  }

  if (dispositivos.length === 0) {
    return <p className="p-6 text-gray-400">Carregando dispositivos...</p>
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-200">
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold tracking-wide">
            PAINEL INDUSTRIAL
          </h1>

          <div className="flex gap-3">
            <button
              onClick={promoverAlteracao}
              disabled={loading}
              className="border border-green-500 text-green-500 px-4 py-1 text-sm hover:bg-green-500 hover:text-black transition disabled:opacity-50"
            >
              + DISPOSITIVO
            </button>

            <button
              onClick={() => router.push("/")}
              className="border border-gray-600 px-4 py-1 text-sm hover:bg-gray-800"
            >
              VOLTAR
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="mb-6 text-sm text-gray-400">
          Dispositivos ativos:{" "}
          <span className="text-green-400 font-bold">
            {dispositivos.filter(d => d.status === "online").length}
          </span>{" "}
          / {dispositivos.length}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dispositivos.map(dados => {
            const online = dados.status === "online"

            return (
              <div
                key={dados.id}
                className="bg-neutral-800 border border-gray-700 rounded-xl p-4 hover:border-gray-500 transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xs text-gray-400">{dados.nome}</h2>

                  <div className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        online ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span>{dados.status.toUpperCase()}</span>
                  </div>
                </div>

                <div className="text-2xl font-bold mb-3">
                  {dados.sensores.temperatura}°C
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                  <span>PRESS: {dados.sensores.pressao}</span>
                  <span>UMID: {dados.sensores.umidade}%</span>
                  <span>PRES: {dados.sensores.presenca ? "SIM" : "NÃO"}</span>

                  <span
                    className={`font-bold ${
                      dados.sensores.rele ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    RELÉ: {dados.sensores.rele ? "ON" : "OFF"}
                  </span>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      acao("http://localhost:8080/rele", {
                        id: dados.id,
                        status: true
                      })
                    }
                    disabled={loading}
                    className="flex-1 border border-green-500 text-green-500 py-1 text-xs hover:bg-green-500 hover:text-black transition disabled:opacity-50"
                  >
                    ON
                  </button>

                  <button
                    onClick={() =>
                      acao("http://localhost:8080/rele", {
                        id: dados.id,
                        status: false
                      })
                    }
                    disabled={loading}
                    className="flex-1 border border-red-500 text-red-500 py-1 text-xs hover:bg-red-500 hover:text-black transition disabled:opacity-50"
                  >
                    OFF
                  </button>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() =>
                      acao("http://localhost:8080/conexao", {
                        id: dados.id,
                        status: "online"
                      })
                    }
                    disabled={loading}
                    className="flex-1 border border-blue-500 text-blue-500 py-1 text-xs hover:bg-blue-500 hover:text-black transition disabled:opacity-50"
                  >
                    ONLINE
                  </button>

                  <button
                    onClick={() =>
                      acao("http://localhost:8080/conexao", {
                        id: dados.id,
                        status: "offline"
                      })
                    }
                    disabled={loading}
                    className="flex-1 border border-yellow-500 text-yellow-500 py-1 text-xs hover:bg-yellow-500 hover:text-black transition disabled:opacity-50"
                  >
                    OFFLINE
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => abrirEdicao(dados)}
                    disabled={loading}
                    className="flex-1 border border-purple-500 text-purple-500 py-1 text-xs hover:bg-purple-500 hover:text-black transition disabled:opacity-50"
                  >
                    ATUALIZAR
                  </button>

                  <button
                    onClick={() => deletarDispositivo(dados.id)}
                    disabled={loading}
                    className="flex-1 border border-red-700 text-red-500 py-1 text-xs hover:bg-red-700 hover:text-white transition disabled:opacity-50"
                  >
                    DELETAR
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {loading && (
          <p className="text-xs text-gray-500 mt-4">
            Processando...
          </p>
        )}
      </div>

      {editando && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-5">
              Atualizar Dispositivo
            </h2>

            <div className="space-y-3">
              <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Nome do dispositivo"
                className="w-full p-3 rounded bg-neutral-900 border border-gray-700 outline-none"
              />

              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full p-3 rounded bg-neutral-900 border border-gray-700 outline-none"
              >
                <option value="online">online</option>
                <option value="offline">offline</option>
              </select>

              <input
                type="number"
                value={temperatura}
                onChange={e => setTemperatura(Number(e.target.value))}
                placeholder="Temperatura"
                className="w-full p-3 rounded bg-neutral-900 border border-gray-700 outline-none"
              />

              <input
                type="number"
                value={pressao}
                onChange={e => setPressao(Number(e.target.value))}
                placeholder="Pressão"
                className="w-full p-3 rounded bg-neutral-900 border border-gray-700 outline-none"
              />

              <input
                type="number"
                value={umidade}
                onChange={e => setUmidade(Number(e.target.value))}
                placeholder="Umidade"
                className="w-full p-3 rounded bg-neutral-900 border border-gray-700 outline-none"
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={presenca}
                  onChange={e => setPresenca(e.target.checked)}
                />
                Presença detectada
              </label>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={rele}
                  onChange={e => setRele(e.target.checked)}
                />
                Relé ligado
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={atualizarDispositivo}
                className="flex-1 bg-green-600 hover:bg-green-700 p-3 rounded font-semibold transition"
              >
                Salvar
              </button>

              <button
                onClick={() => setEditando(null)}
                className="flex-1 bg-red-600 hover:bg-red-700 p-3 rounded font-semibold transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}