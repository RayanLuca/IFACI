"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardDispositivo() {
  const [dispositivos, setDispositivos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
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

                <div className="flex gap-2">
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
    </div>
  )
}