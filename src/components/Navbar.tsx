import {Link} from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav className="bg-white shadow-md w-full z-1">
                <div className="max-w-7xl mx-auto py-5 flex justify-between items-center">
                    <div>
                        <Link to="/VoorJou" reloadDocument className="text-2xl font-semibold hover:text-blue-600 hover:underline font-mono transition duration-300">
                            Boek voor jou
                        </Link>
                    </div>
                    <ul className="flex gap-6">
                        <li>
                            <Link to="/VoorJou" reloadDocument className="text-1xl hover:underline hover:text-blue-600 transition-all duration-300">
                                Voor Jou
                            </Link>
                        </li>
                        <li>
                            <Link to="/Ontdekken" reloadDocument className="text-1xl hover:underline hover:text-blue-600 transition-all duration-300">
                                Ontdekken
                            </Link>
                        </li>
                        <li>
                            <Link to="/LeesLijst" reloadDocument className="text-1xl hover:underline hover:text-blue-600 transition-all duration-300">
                                Leeslijst
                            </Link>
                        </li>
                        <li>
                            <Link to="/Profiel" reloadDocument className="text-1xl hover:underline hover:text-blue-600 transition-all duration-300">
                                Profiel
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
)
}

export default Navbar