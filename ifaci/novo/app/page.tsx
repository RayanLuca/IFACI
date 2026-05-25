"use client"

import CriarUsuario from "./components/CriarUsuario"
import Header from "./components/Header"
import ListarUsuario from "./components/ListarUsuario"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-200">
      <Header />

      <div className="w-full border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg tracking-wide font-semibold">
            PAINEL DO SISTEMA
          </h1>

          <button
            onClick={() => router.push("/dashboard")}
            className="border border-red-500 text-red-500 px-4 py-2 hover:bg-red-500 hover:text-black transition"
          >
            ABRIR DASHBOARD
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-neutral-800 border border-gray-700 p-5 rounded-xl shadow overflow-hidden">
            <h2 className="text-sm text-gray-400 mb-4">
              CRIAR USUÁRIO
            </h2>

            <div className="w-full">
              <CriarUsuario />
            </div>
          </div>

          <div className="bg-neutral-800 border border-gray-700 p-5 rounded-xl shadow overflow-hidden">
            <h2 className="text-sm text-gray-400 mb-4">
              USUÁRIOS CADASTRADOS
            </h2>

            <div className="w-full overflow-auto max-h-[400px]">
              <ListarUsuario />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}