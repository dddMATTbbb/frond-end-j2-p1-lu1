export function LandingPage() {
    return (
        <>
            <div className="flex justify-center items-center h-screen w-full flex-col">
                <h1 className="text-black text-7xl text-center mb-20">Welkom bij kiesboek</h1>
                <div className="flex justify-center items-center h-1/2 w-1/4 border-4 rounded-4xl flex-col px-12">
                    <p className="font-bold text-3xl">Login</p>
                    <fieldset className="w-full mt-10">
                        <input type="email" placeholder="E-mail"
                               className="border-b-2 focus:border-blue-400 outline-0 duration-500 w-full"/>
                        <input type="password" placeholder="Wachtwoord"
                               className="border-b-2 focus:border-blue-400 outline-0 duration-500 w-full mt-8"/>
                    </fieldset>
                    <button
                        className="border-orange-500 bg-orange-500 border-4 rounded-xl mt-5 w-24 hover:bg-orange-400 hover:border-orange-400 duration-500">
                        Aanmelden
                    </button>
                    <p className="text-black mt-30">Heb je geen account?</p>
                    <button className="border-orange-500 bg-orange-500 border-4 rounded-xl mt-2 w-32 hover:bg-orange-400 hover:border-orange-400 duration-500">Account maken</button>
                </div>
            </div>
        </>
    )
}