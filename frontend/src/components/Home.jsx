const Home = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-row">
      <div className="my-20 flex flex-col font-inter">
        <div className="mb-6">
          <h1 className="text-4xl">Ett stycke bandyhistoria</h1>
        </div>
        <div className="w-[400px]">
          <h2 className="text-xl">
            Samlade resultat från de högsta serierna - 1907 och framåt
          </h2>
        </div>
      </div>
      <div className="flex flex-row h-16 w-64 items-center border-2 border-[#011d29] rounded-md">
        <div className="h-16 w-16">
          <img src="/logo/vetlanda_emblem_rgb-e1636463705320.png" alt="" />
        </div>
        <div className="font-inter text-base w-32">Vetlanda</div>
        <div className="w-16 pl-4">
          <input type="checkbox" name="" id="" />
        </div>
      </div>
    </div>
  )
}

export default Home
