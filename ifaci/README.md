<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/SENAI_S%C3%A3o_Paulo_logo.png" alt="Logo SENAI" width="400">
</p>

<br><br>

<p align="center">
  <strong>SERVIÇO NACIONAL DE APRENDIZAGEM INDUSTRIAL – SENAI</strong>
</p>

<br><br><br>

<p align="center">
  <strong>Sistema Web para Monitoramento e Controle de Dispositivos IoT.</strong>
</p>

<h1 align="center">IFACI</h1>



<br><br><br>

>

<br><br><br><br>

<p align="center">
  Sorocaba-SP<br>
  2026
</p>

# SISTEMA WEB PARA MONITORAMENTO E CONTROLE DE DISPOSITIVOS IoT UTILIZANDO NODE.JS E NEXT.JS

---

# 1 INTRODUÇÃO

Com o avanço da Indústria 4.0 e da Internet das Coisas (IoT), tornou-se cada vez mais importante o desenvolvimento de aplicações capazes de monitorar equipamentos e sensores em tempo real. A integração entre dispositivos inteligentes e sistemas web permite maior controle operacional, automação e acompanhamento remoto de processos industriais.

Neste contexto, foi desenvolvido um sistema web para monitoramento e gerenciamento de dispositivos IoT, permitindo o controle remoto de sensores e atuadores através de uma interface moderna e responsiva.

O sistema desenvolvido possui funcionalidades de:

- Cadastro e gerenciamento de usuários;
- Monitoramento de dispositivos industriais;
- Controle de relés;
- Alteração de status online/offline;
- Atualização de sensores em tempo real;
- Dashboard industrial responsivo.

A aplicação foi desenvolvida utilizando Node.js no backend e Next.js no frontend, utilizando comunicação baseada em API REST.

---

# 2 OBJETIVO

O objetivo deste trabalho consiste em desenvolver uma aplicação web capaz de monitorar e controlar dispositivos IoT em tempo real, oferecendo uma interface moderna para gerenciamento industrial.

Além disso, busca-se aplicar conceitos de:

- Desenvolvimento Full Stack;
- APIs REST;
- IoT;
- Monitoramento industrial;
- Integração frontend/backend;
- Atualização dinâmica de dados.

---

# 3 TECNOLOGIAS UTILIZADAS

## 3.1 Backend

O backend da aplicação foi desenvolvido utilizando:

- Node.js;
- Express;
- Cors;
- JavaScript.

A API REST foi responsável pelo gerenciamento dos usuários e dispositivos industriais.

---

## 3.2 Frontend

O frontend foi desenvolvido utilizando:

- Next.js;
- React;
- Tailwind CSS;
- TypeScript.

A interface foi construída com foco em responsividade, organização visual e experiência do usuário.

---

# 4 FUNCIONALIDADES DO SISTEMA

## 4.1 Gerenciamento de Usuários

O sistema permite:

- Criar usuários;
- Atualizar usuários;
- Excluir usuários;
- Listar usuários cadastrados.

As operações são realizadas através dos métodos HTTP:

| Método | Endpoint | Função |
|---|---|---|
| GET | /usuarios | Listar usuários |
| POST | /novoUsuario | Criar usuário |
| PUT | /usuarios/:id | Atualizar usuário |
| DELETE | /usuarios/:id | Remover usuário |

---

## 4.2 Gerenciamento de Dispositivos

O sistema também permite o gerenciamento dos dispositivos IoT.

Cada dispositivo possui:

- Nome;
- Status online/offline;
- Temperatura;
- Pressão;
- Umidade;
- Presença;
- Estado do relé.

Os métodos implementados foram:

| Método | Endpoint | Função |
|---|---|---|
| GET | /dispositivos | Listar dispositivos |
| POST | /dispositivos | Criar dispositivo |
| PUT | /dispositivos/:id | Atualizar dispositivo |
| DELETE | /dispositivos/:id | Remover dispositivo |

---

# 5 DASHBOARD INDUSTRIAL

O dashboard industrial foi desenvolvido para permitir visualização em tempo real dos dispositivos conectados.

Cada card apresenta:

- Temperatura atual;
- Pressão;
- Umidade;
- Presença detectada;
- Estado do relé;
- Status online/offline.

Além disso, o sistema permite:

- Ligar/desligar relés;
- Alterar conexão;
- Atualizar dispositivos;
- Remover dispositivos.

---

# 6 SIMULAÇÃO DOS SENSORES

Para simular um ambiente industrial real, foi implementado um sistema automático de atualização dos sensores utilizando `setInterval()`.

Os sensores geram valores aleatórios de:

- Temperatura;
- Pressão;
- Umidade;
- Presença.

A atualização ocorre automaticamente a cada 3 segundos.

---

# 7 ARQUITETURA DO SISTEMA

A aplicação foi desenvolvida utilizando arquitetura cliente-servidor.

## Estrutura:

- Frontend → Next.js;
- Backend → Node.js + Express;
- Comunicação → API REST;
- Dados → Objetos JSON.

O frontend realiza requisições HTTP para a API utilizando os métodos REST.

---

# 8 INTERFACE DO SISTEMA

## 8.1 Painel Administrativo

O painel administrativo possui:

- Cadastro de usuários;
- Atualização de usuários;
- Exclusão de usuários;
- Visualização de dados.

A interface utiliza tema escuro inspirado em dashboards industriais modernos.

---

## 8.2 Dashboard de Dispositivos

O dashboard exibe os dispositivos em tempo real através de cards industriais responsivos.

Cada card apresenta informações detalhadas dos sensores e controles rápidos para gerenciamento dos dispositivos.

---

# 9 RESULTADOS OBTIDOS

Os testes realizados demonstraram que o sistema apresentou:

- Comunicação eficiente entre frontend e backend;
- Atualização dinâmica dos sensores;
- Controle remoto funcional;
- Interface intuitiva;
- Boa organização estrutural do código.

A utilização do React e Next.js proporcionou uma experiência moderna e dinâmica para o usuário.

---

# 10 CONCLUSÃO

Conclui-se que o sistema desenvolvido atingiu os objetivos propostos, fornecendo uma solução funcional para monitoramento e gerenciamento de dispositivos IoT.

A integração entre Node.js, Express e Next.js possibilitou o desenvolvimento de uma aplicação organizada, responsiva e escalável.

O projeto também permitiu aplicar conceitos importantes relacionados à Indústria 4.0, APIs REST e desenvolvimento Full Stack.

Como melhorias futuras, pretende-se implementar:

- Banco de dados MySQL;
- Autenticação JWT;
- Integração MQTT;
- Deploy em nuvem AWS;
- Histórico de sensores;
- Gráficos em tempo real.

---

# 11 DIAGRAMA DO SISTEMA

<img width="1536" height="1024" alt="Dashboard Industrial IoT" src="https://github.com/user-attachments/assets/cf62393b-9b67-4d2f-afeb-8b92354bc34f" />

---

# 12 REFERÊNCIAS

https://nodejs.org/;

https://nextjs.org/;

https://expressjs.com/pt-br/;

https://react.dev/;

https://tailwindcss.com/;

https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods;

https://aws.amazon.com/what-is/iot/;

https://developer.mozilla.org/pt-BR/docs/Web/JavaScript.
