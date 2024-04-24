const Home = () => {
  return (
    <div className="mx-auto mb-2 flex h-[25rem] max-w-7xl flex-row justify-between font-inter">
      <div className="my-20 flex flex-col">
        <div className="mb-6">
          <h1 className="pl-2 text-base font-bold text-primary sm:text-4xl">
            Ett stycke bandyhistoria
          </h1>
        </div>
        <div className="w-[200px] pl-2 md:w-[300px] lg:w-[400px]">
          <h2 className="mb-4 text-sm font-bold sm:text-xl">
            Samlade resultat från de högsta serierna - 1907 och framåt
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Home
