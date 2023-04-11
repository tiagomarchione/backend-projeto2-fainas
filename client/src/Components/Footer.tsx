import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { Link } from "./Link";

export function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="flex flex-col p-3 bg-slate-300 max-w-full min-h-[10vh] shadow-lg-inverter">
            <div className="flex flex-col self-center">
                <ul className="flex justify-center items-center gap-10 text-xl">
                    <li className="cursor-pointer hover:text-[#4267b2]">
                        <FaFacebook />
                    </li>
                    <li className="cursor-pointer hover:text-[#dd2a7b]">
                        <FaInstagram />
                    </li>
                    <li className="cursor-pointer hover:text-[#00acee]">
                        <FaTwitter />
                    </li>
                    <li className="cursor-pointer hover:text-[#0e76a8]">
                        <FaLinkedin />
                    </li>
                </ul>
                <p className="justify-center items-center text-center pt-3 text-base">
                    <span className="text-[#12154e] font-bold">Fainas</span> &copy;2023
                </p>
            </div>
        </footer>
    )
};
