import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar.tsx";

export function NotFoundPage() {
    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h1>404 - Pagina niet gevonden</h1>
                <p>Oeps! De pagina die je zoekt bestaat niet.</p>
                <Link to="/"><button className={"border-2 p2 rounded-md"}>Terug naar de homepagina</button></Link>
            </div>
        </>
    );
}