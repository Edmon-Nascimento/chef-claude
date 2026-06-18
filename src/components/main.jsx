import { useState } from "react";
import Ingredients from "./ingredients";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null)

  function addIngredient(formData) {

    const newIngredient = formData.get("ingredient")
    setIngredients(prevIngredients => [...prevIngredients, newIngredient])

  }

  return (
    <section className="flex flex-col max-w-7xl m-auto items-center py-10">
      <form className="flex gap-5" action={addIngredient}>
        <input
          className="border h-10 rounded-md px-3 outline-0"
          type="text"
          name="ingredient"
          id="ingredient"
          placeholder="e.g oregano"
        />
        <button
          className="bg-blue-500 text-white px-3 rounded-md cursor-pointer"
        >
          + Add ingredient
        </button>
      </form>

      {ingredients.length > 0 && <Ingredients ingredientsList={ingredients} setRecipe={setRecipe}/>}
      {recipe && <p className="whitespace-pre-wrap mt-6">{recipe}</p>}
    </section>
  );
}
