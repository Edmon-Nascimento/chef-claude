import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const PROMPT =
  "Você é um chef de cozinha experiente. Responda SEMPRE em português do Brasil (pt-BR). " +
  "Com base nos ingredientes fornecidos, crie uma receita prática e saborosa. " +
  "Use ingredientes básicos de despensa (sal, pimenta, azeite, alho, cebola) se necessário. " +
  "Responda EXATAMENTE neste formato markdown, sem texto antes ou depois:\n\n" +
  "## [Nome da Receita]\n\n" +
  "**Tempo de preparo:** X minutos | **Rendimento:** X porções\n\n" +
  "## Ingredientes\n\n" +
  "- quantidade + ingrediente\n\n" +
  "## Modo de Preparo\n\n" +
  "1. Primeiro passo\n" +
  "2. Segundo passo\n\n" +
  "## Dica do Chef\n\n" +
  "Uma dica especial.\n\n" +
  "Ingredientes disponíveis:"

export default defineConfig(({ mode }) => {
  // loadEnv com prefixo '' carrega TODAS as variáveis do .env.local, não só VITE_*
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/generate-recipe', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', async () => {
              try {
                const { ingredients } = JSON.parse(body)

                const hfRes = await fetch(
                  'https://router.huggingface.co/v1/chat/completions',
                  {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${env.HF_API_KEY}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      model: 'mistralai/Mistral-7B-Instruct-v0.2:featherless-ai',
                      messages: [
                        { role: 'system', content: PROMPT },
                        { role: 'user', content: ingredients.join(', ') },
                      ],
                      stream: false,
                    }),
                  }
                )
                const data = await hfRes.json()

                if (!hfRes.ok || !data.choices) {
                  console.error('Resposta HF inesperada:', JSON.stringify(data))
                  res.statusCode = 500
                  res.end(JSON.stringify({ error: data.error?.message ?? 'Erro desconhecido da API HF' }))
                  return
                }

                const text = data.choices[0].message.content
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ generated_text: text }))
              } catch (error) {
                console.error('ERRO:', error.message, '\nCAUSA:', error.cause)
                res.statusCode = 500
                res.end(JSON.stringify({ error: error.message }))
              }
            })
          })
        },
      },
    ],
  }
})
