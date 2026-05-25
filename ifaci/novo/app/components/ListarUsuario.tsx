"use client"

import { useEffect, useState } from "react"

type Usuario = {
  id: number
  nome_completo: string
  email: string
  senha: string
}

export default function ListarUsuario() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const [editando, setEditando] = useState<Usuario | null>(null)

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  // =========================
  // 📥 LISTAR USUÁRIOS
  // =========================

  async function carregar() {
    try {
      const res = await fetch("http://localhost:8080/usuarios")

      const data = await res.json()

      setUsuarios(data)
    } catch (erro) {
      console.log("Erro ao carregar usuários", erro)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  // =========================
  // ❌ DELETAR
  // =========================

  async function deletar(id: number) {
    try {
      await fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "DELETE"
      })

      carregar()
    } catch (erro) {
      console.log("Erro ao deletar", erro)
    }
  }

  // =========================
  // ✏️ ABRIR EDIÇÃO
  // =========================

  function abrirEdicao(user: Usuario) {
    setEditando(user)

    setNome(user.nome_completo)
    setEmail(user.email)
    setSenha(user.senha)
  }

  // =========================
  // 💾 ATUALIZAR
  // =========================

  async function atualizarUsuario() {
    if (!editando) return

    try {
      await fetch(`http://localhost:8080/usuarios/${editando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome_completo: nome,
          email,
          senha
        })
      })

      setEditando(null)

      setNome("")
      setEmail("")
      setSenha("")

      carregar()
    } catch (erro) {
      console.log("Erro ao atualizar", erro)
    }
  }

  return (
    <>
      <div className="w-full max-h-[300px] overflow-auto flex flex-col gap-2">

        {usuarios.length === 0 && (
          <p className="text-xs text-gray-500">
            Nenhum usuário cadastrado
          </p>
        )}

        {usuarios.map((user) => (
          <div
            key={user.id}
            className="border border-gray-700 p-3 text-sm flex justify-between items-center rounded-lg bg-neutral-900"
          >

            <div className="flex flex-col overflow-hidden">
              <span className="font-semibold truncate">
                {user.nome_completo}
              </span>

              <span className="text-xs text-gray-400 truncate">
                {user.email}
              </span>
            </div>

            <div className="flex gap-2 shrink-0">

              <button
                onClick={() => abrirEdicao(user)}
                className="text-yellow-400 text-xs hover:text-yellow-600"
              >
                atualizar
              </button>

              <button
                onClick={() => deletar(user.id)}
                className="text-red-400 text-xs hover:text-red-600"
              >
                excluir
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* ========================= */}
      {/* ✏️ MODAL */}
      {/* ========================= */}

      {editando && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-neutral-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md">

            <h2 className="text-xl font-bold mb-5">
              Atualizar Usuário
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full p-3 rounded bg-neutral-900 border border-gray-700 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded bg-neutral-900 border border-gray-700 outline-none"
              />

              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-3 rounded bg-neutral-900 border border-gray-700 outline-none"
              />

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={atualizarUsuario}
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
    </>
  )
}