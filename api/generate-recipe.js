const prompt = "Aja como um chef de cozinha experiente, criativo e focado em evitar o desperdício de alimentos. Vou te fornecer uma lista de ingredientes que tenho disponíveis na minha geladeira e despensa. Com base neles, crie uma receita prática e saborosa seguindo as diretrizes abaixo: 1. **Prioridade de Ingredientes:** Utilize prioritariamente os ingredientes da lista. Você pode incluir itens básicos de despensa que a maioria das pessoas tem em casa (como sal, pimenta, óleo/azeite, água, alho e cebola). Se precisar de algo fora disso, sinalize como Opcional ou Substituível. 2. **Grau de Complexidade:** Mantenha a receita simples/média, focando em preparos práticos para o dia a dia. 3. **Estrutura da Resposta:** Apresente o resultado no seguinte formato: - **Nome da Receita:** Um nome atraente. - **Tempo de Preparo:** Estimativa em minutos.- **Rendimento:** Quantas porções rende aproximadamente. - **Ingredientes Utilizados:** Lista clara com as quantidades sugeridas.- **Modo de Preparo:** Passo a passo simplificado e em tópicos. - **Dica do Chef:** Uma sugestão de substituição, variação ou toque especial para elevar o prato. Aqui estão os meus ingredientes:"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { ingredients } = req.body
    const key = process.env.HF_API_KEY

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/meta-llama/Llama-3.2-3B-Instruct/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.2-3B-Instruct",
          messages: [
            { role: "user", content: prompt + ingredients.join(", ") }
          ],
          max_tokens: 1000
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