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
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
    await carregarDados()
    setLoading(false)
  }

  async function promoverAlteracao() {
    setLoading(true)
    try {
      await fetch("http://localhost:8080/dispositivos", {
        method: "POST"
      })
      await carregarDados()
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  if (dispositivos.length === 0)
    return <p className="p-6 text-gray-400">Carregando dispositivos...</p>

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-200">

      {/* HEADER */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <h1 className="text-lg font-semibold tracking-wide">
            PAINEL INDUSTRIAL
          </h1>

          <div className="flex gap-3">

            <button
              onClick={promoverAlteracao}
              className="border border-green-500 text-green-500 px-4 py-1 text-sm hover:bg-green-500 hover:text-black transition"
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

      {/* CONTEÚDO */}
      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* STATUS GERAL */}
        <div className="mb-6 text-sm text-gray-400">
          Dispositivos ativos:{" "}
          <span className="text-green-400 font-bold">
            {dispositivos.filter(d => d.status === "online").length}
          </span>{" "}
          / {dispositivos.length}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {dispositivos.map((dados) => {
            const online = dados.status === "online"

            return (
              <div
                key={dados.id}
                className="bg-neutral-800 border border-gray-700 rounded-xl p-4 hover:border-gray-500 transition"
              >

                {/* HEADER */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xs text-gray-400">
                    {dados.nome}
                  </h2>

                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${
                      online ? "bg-green-500" : "bg-red-500"
                    }`} />
                    <span>{dados.status.toUpperCase()}</span>
                  </div>
                </div>

                {/* TEMPERATURA */}
                <div className="text-2xl font-bold mb-3">
                  {dados.sensores.temperatura}°C
                </div>

                {/* DADOS */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-4">
                  <span>PRESS: {dados.sensores.pressao}</span>
                  <span>UMID: {dados.sensores.umidade}%</span>
                  <span>PRES: {dados.sensores.presenca ? "SIM" : "NÃO"}</span>

                  <span className={`font-bold ${
                    dados.sensores.rele ? "text-green-400" : "text-red-400"
                  }`}>
                    RELÉ: {dados.sensores.rele ? "ON" : "OFF"}
                  </span>
                </div>

                {/* CONTROLES RELÉ */}
                <div className="flex gap-2 mb-2">

                  <button
                    onClick={() =>
                      acao("http://localhost:8080/rele", {
                        id: dados.id,
                        status: true
                      })
                    }
                    className="flex-1 border border-green-500 text-green-500 py-1 text-xs hover:bg-green-500 hover:text-black transition"
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
                    className="flex-1 border border-red-500 text-red-500 py-1 text-xs hover:bg-red-500 hover:text-black transition"
                  >
                    OFF
                  </button>

                </div>

                {/* 🚀 CONTROLE DE STATUS (NOVO) */}
                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      acao("http://localhost:8080/conexao", {
                        id: dados.id,
                        status: "online"
                      })
                    }
                    className="flex-1 border border-blue-500 text-blue-500 py-1 text-xs hover:bg-blue-500 hover:text-black transition"
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
                    className="flex-1 border border-yellow-500 text-yellow-500 py-1 text-xs hover:bg-yellow-500 hover:text-black transition"
                  >
                    OFFLINE
                  </button>

                </div>

              </div>
            )
          })}

        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-xs text-gray-500 mt-4">
            Processando...
          </p>
        )}

      </div>
    </div>
  )
}