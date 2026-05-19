"use client"

import { useEffect, useState } from "react"

export default function ListarUsuario() {
  const [usuarios, setUsuarios] = useState<any[]>([])

  async function carregar() {
    const res = await fetch("http://localhost:8080/usuarios")
    const data = await res.json()
    setUsuarios(data)
  }

  async function deletar(id: number) {
    await fetch(`http://localhost:8080/usuarios/${id}`, {
      method: "DELETE"
    })

    carregar()
  }

  useEffect(() => {
    carregar()
  }, [])

  return (
    <div className="w-full max-h-[300px] overflow-auto flex flex-col gap-2">

      {usuarios.length === 0 && (
        <p className="text-xs text-gray-500">
          Nenhum usuário cadastrado
        </p>
      )}

      {usuarios.map((user) => (
        <div
          key={user.id}
          className="border border-gray-700 p-2 text-sm flex justify-between items-center"
        >
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold truncate">
              {user.nome_completo}
            </span>

            <span className="text-xs text-gray-400 truncate">
              {user.email}
            </span>
          </div>

          <button
            onClick={() => deletar(user.id)}
            className="text-red-400 text-xs hover:text-red-600 shrink-0"
          >
            excluir
          </button>
        </div>
      ))}

    </div>
  )
}