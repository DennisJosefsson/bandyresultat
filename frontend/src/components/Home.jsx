const Home = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-row justify-between h-[24rem] mb-2">
      <div className="my-20 flex flex-col font-inter">
        <div className="mb-6">
          <h1 className="text-base font-bold pl-2 sm:text-4xl">
            Ett stycke bandyhistoria
          </h1>
        </div>
        <div className="w-[200px] pl-2 lg:w-[400px]">
          <h2 className="text-sm font-bold sm:text-xl mb-4">
            Samlade resultat från de högsta serierna - 1907 och framåt
          </h2>
          <h2 className="text-sm  font-bold lg:hidden">
            Men tyvärr finns det ingen version som passar för mindre skärmar.
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Home
