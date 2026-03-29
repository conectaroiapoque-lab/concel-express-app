# Concel Express (PWA)

Aplicativo React mobile-first para solicitar coleta de celular para conserto em até 1 hora.

## Funcionalidades

- Tela inicial com botões grandes e linguagem simples.
- Solicitação de coleta em apenas 3 passos.
- Acompanhamento de pedido por código.
- Botão de WhatsApp com mensagem automática.
- Painel admin simples com lista de pedidos, detalhes, alteração de status e link de acompanhamento.
- Instalável como PWA.

## Tecnologias

- React + Vite
- Firebase Firestore
- Service Worker + Manifest Web App

## Rodar localmente

1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure Firebase:
   ```bash
   cp .env.example .env
   ```
   Preencha as variáveis com seu projeto Firebase.
3. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Publicar como PWA

1. Gere build de produção:
   ```bash
   npm run build
   ```
2. Faça deploy da pasta `dist` em um host HTTPS (Firebase Hosting, Vercel, Netlify etc.).
3. No navegador mobile, abra o site publicado e escolha **Adicionar à tela inicial**.

## Observações do Firebase

- Crie coleção `orders` no Firestore.
- Exemplo de regra inicial para testes (não usar em produção):
  ```txt
  service cloud.firestore {
    match /databases/{database}/documents {
      match /orders/{docId} {
        allow read, write: if true;
      }
    }
  }
  ```
