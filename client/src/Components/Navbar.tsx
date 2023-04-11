import { useNavigate } from "react-router-dom";
import { Link } from "./Link";

export function Navbar() {
    const navigate = useNavigate();

    return (
        <header className="flex flex-row p-3 bg-slate-300 justify-between shadow-lg max-w-full min-h-[10vh]">
            <div className="flex flex-row self-center gap-10">
                <a href="/" className="flex flex-row gap-2 text-2xl">
                    <img src="/logo.png" alt="" className="w-10 self-center"/>
                    <span className="font-bold text-[#12154e] uppercase self-center">Fainas</span>
                </a>
            </div>
            <div className="flex flex-row self-center gap-4 p-3">
                <nav className="self-center">
                    <Link to="/">Página Inicial</Link>
                    <Link to="/fainas">Fainas</Link>
                </nav>
                <button onClick={() => {
                    navigate("/criar-faina")
                }} className=" self-center bg-green-500 hover:bg-green-700 text-sm text-white px-4 py-2 font-bold rounded-lg">Nova Faina</button>
            </div>
        </header>
    )
};
