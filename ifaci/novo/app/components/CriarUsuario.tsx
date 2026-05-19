"use client"

import { useState } from "react"

export default function CriarUsuario() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function criar() {
    await fetch("http://localhost:8080/novoUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome_completo: nome,
        email,
        senha
      })
    })

    setNome("")
    setEmail("")
    setSenha("")
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        criar()
      }}
      className="flex flex-col gap-3 w-full"
    >
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome completo"
        className="w-full bg-neutral-900 border border-gray-700 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full bg-neutral-900 border border-gray-700 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />

      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
        className="w-full bg-neutral-900 border border-gray-700 px-3 py-2 text-sm outline-none focus:border-blue-500"
      />

      <button
        type="submit"
        className="border border-green-500 text-green-500 py-2 text-sm hover:bg-green-500 hover:text-black transition"
      >
        CRIAR USUÁRIO
      </button>
    </form>
  )
}