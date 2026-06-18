export default function Ingredients({ ingredientsList, setRecipe }) {
  async function getRecipe() {
    const response = await fetch("/api/generate-recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientsList }),
    })
    const data = await response.json()

    if (data.error) {
      console.error("Erro ao gerar receita:", data.error)
      alert("Erro ao gerar receita. Tente novamente.")
    } else {
      setRecipe(data.generated_text)
    }
  }

  return (
    <>
      <div>
        <h2>Ingredients on hand:</h2>
        {ingredientsList.map((ingredient) => (
          <ul key={ingredient}>
            <li>{ingredient}</li>
          </ul>
        ))}
      </div>

      <div>
        <h3>Ready for a recipe?</h3>
        <p>Generate a recipe from your list of ingredients</p>
        <button
          className="cursor-pointer bg-blue-500 py-2 px-3"
          onClick={getRecipe}
        >
          Get a recipe
        </button>
      </div>
    </>
  )
}