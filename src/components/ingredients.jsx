import { useState } from "react";

export default function Ingredients({ ingredientsList, setRecipe }) {
  const [loading, setLoading] = useState(false);

  async function getRecipe() {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientsList }),
      });
      const data = await response.json();

      if (data.error) {
        console.error("Erro ao gerar receita:", data.error);
        alert("Erro ao gerar receita. Tente novamente.");
      } else {
        setRecipe(data.generated_text);
      }
    } catch (err) {
      console.error("Erro ao gerar receita:", err);
      alert("Erro ao gerar receita. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Ingredientes selecionados
        </h2>
        <div className="flex flex-wrap gap-2">
          {ingredientsList.map((ingredient, index) => (
            <span
              key={`${ingredient}-${index}`}
              className="bg-red-50 text-[#EA1D2C] border border-red-100 px-3 py-1 rounded-full text-sm font-medium capitalize"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-[#EA1D2C] rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">Pronto para cozinhar?</h3>
          <p className="text-red-200 text-sm mt-1">Gere uma receita com seus ingredientes</p>
        </div>
        <button
          onClick={getRecipe}
          disabled={loading}
          className="bg-white text-[#EA1D2C] font-bold px-6 py-2.5 rounded-xl cursor-pointer hover:bg-red-50 transition-colors disabled:opacity-60 text-sm whitespace-nowrap shrink-0"
        >
          {loading ? "Gerando..." : "Gerar Receita"}
        </button>
      </div>
    </div>
  );
}
