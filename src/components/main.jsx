import { useState } from "react";

export default function Main() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [hasIngredients, setHasIngredients] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();

    if (!input) {
      alert("Enter a valid ingredient");
      return;
    }

    setIngredients([...ingredients, input]);
    setHasIngredients (true)
    setInput("");
  }

  return (
    <section className="flex flex-col max-w-7xl m-auto items-center py-10">
      <form className="flex gap-5">
        <input
          className="border h-10 rounded-md px-3 outline-0"
          type="text"
          name="ingredient"
          id="ingredient"
          placeholder="e.g oregano"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-3 rounded-md cursor-pointer"
          onClick={(e) => handleSubmit(e)}
        >
          + Add ingredient
        </button>
      </form>

      {hasIngredients && (

        <div>
            <h2 className="mt-10 text-3xl">Recipe</h2>
            <ul className="mt-5 list-disc text-lg">
              {ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
        </div>
      )}
    </section>
  );
}
