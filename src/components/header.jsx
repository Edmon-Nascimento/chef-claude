import logo from "../assets/icons/chef_hat.svg"

export default function Header() {
  return (
    <header className="w-full bg-[#EA1D2C] shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
        <span className="text-3xl"><img className="size-10" src={logo} alt="" /></span>
        <div>
          <h1 className="text-xl font-bold text-white leading-tight">Receita na mão - Gere receitas com IA</h1>
        </div>
      </div>
    </header>
  );
}
