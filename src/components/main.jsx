import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Ingredients from "./ingredients";
import recipeIcon from "../assets/icons/hand_meal.svg"

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();
    if (newIngredient) {
      setIngredients(prev => [...prev, newIngredient]);
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">O que tem na sua geladeira?</h2>
        <p className="text-gray-500">Adicione os ingredientes e gere uma receita personalizada</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-sm font-medium text-gray-600 mb-3">Adicionar ingrediente</p>
        <form className="flex gap-3" action={addIngredient}>
          <input
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#EA1D2C] focus:ring-2 focus:ring-[#EA1D2C]/20 transition"
            type="text"
            name="ingredient"
            id="ingredient"
            placeholder="Ex: frango, tomate, queijo..."
          />
          <button className="bg-[#EA1D2C] hover:bg-[#c91824] text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors">
            + Adicionar
          </button>
        </form>
      </div>

      {ingredients.length > 0 && (
        <Ingredients ingredientsList={ingredients} setRecipe={setRecipe} />
      )}

      {recipe && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
            <span className="text-2xl"><img src={recipeIcon} alt="" /></span>
            <h3 className="text-lg font-bold text-gray-800">Sua Receita</h3>
          </div>
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-base font-bold text-[#EA1D2C] uppercase tracking-wide mt-5 mb-2 first:mt-0">
                  {children}
                </h2>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-1 mb-3">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-3 list-none">{children}</ol>
              ),
              li: ({ children, ordered, index }) => (
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  {ordered
                    ? <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#EA1D2C] text-white text-xs flex items-center justify-center font-bold">{index + 1}</span>
                    : <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#EA1D2C]" />
                  }
                  <span>{children}</span>
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-800">{children}</strong>
              ),
            }}
          >
            {recipe}
          </ReactMarkdown>
        </div>
      )}
    </main>
  );
}
