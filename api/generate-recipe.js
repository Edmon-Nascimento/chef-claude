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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { ingredients } = req.body

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
          messages: [
            { role: "system", content: PROMPT },
            { role: "user", content: ingredients.join(", ") },
          ],
          stream: false,
        }),
      }
    )

    const data = await response.json()
    const text = data.choices[0].message.content
    return res.status(200).json({ generated_text: text })
  } catch (error) {
    console.error("ERRO:", error.message)
    return res.status(500).json({ error: error.message })
  }
}
