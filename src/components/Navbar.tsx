import {Link} from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="bg-white shadow-md w-full z-1">
                <div className="max-w-7xl mx-auto py-5 flex justify-between items-center">
                    <div>
                        <a href="#"
                           className="text-2xl font-semibold hover:text-blue-600 hover:underline font-mono transition duration-300">
                            Boek voor jou
                        </a>
                    </div>
                    <ul className="flex gap-6">
                        <li>
                            <Link to="/VoorJou"><a
                                className="text-1xl hover:underline hover:text-blue-600 transition-all duration-300">Voor
                                jou</a>
                            </Link>
                        </li>
                        <li><a
                            className="text-1xl hover:underline hover:text-blue-600 transition-all duration-300">Ontdekken</a>
                        </li>
                        <li><a
                            className="text-1xl hover:underline hover:text-blue-600 transition-all duration-300">Leeslijst</a>
                        </li>
                        <li><a
                            className="text-1xl hover:underline hover:text-blue-600 transition-all duration-300">Profiel</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
)
}

export default Navbar