import Navbar from "../components/Navbar.tsx";

export function ReadListPage(){
    return (
        <>
            <Navbar/>
            <div className="flex justify-center items-center h-screen w-full">
                <h1 className="text-black text-4xl">Lees lijst</h1>
            </div>
        </>
    )
}