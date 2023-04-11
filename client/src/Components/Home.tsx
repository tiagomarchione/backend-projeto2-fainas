export function Home() {
    return(
        <section className='flex flex-row w-2/3 max-w-[600px] justify-center p-6'>
            <div className="bg-slate-200 shadow-md rounded-xl p-3 w-11/12 justify-center">
                <div className="flex flex-row justify-evenly w-full">
                        <div className="flex flex-col p-4 gap-4 text-center">
                            <h3 className="font-bold text-3xl p-4">Bem-vindo ao <span className="bg-slate-300 text-[#12154e] py-0 px-1">Fainas</span></h3>
                            <p className="text-[#7b7b7b] text-lg p-4">Comece a gerenciar seus afazeres agora mesmo!!!</p>
                            <img src="/logo.png" alt="" className="w-5/6 self-center p-4"/>
                        </div>
                          
                </div>          
            </div>
        </section>
    )
}