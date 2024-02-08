const ScrollRefComponent = ({ bottomRef, topRef }) => {
  const scrollTo = (event, ref) => {
    event.preventDefault()
    window.scrollTo(0, ref.current.offsetTop)
  }
  return (
    <div className="sticky bottom-0 z-20 flex flex-row items-center justify-center gap-2 bg-[#f4f5f5]">
      <div
        onClick={(event) => scrollTo(event, topRef)}
        className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
      >
        Scrolla upp
      </div>
      <div
        onClick={(event) => scrollTo(event, bottomRef)}
        className="my-2 cursor-pointer select-none rounded-md bg-[#93B8C1] px-1 py-0.5 text-center text-[10px] text-[#011d29] lg:px-2 lg:py-1 lg:text-sm"
      >
        Scrolla ner
      </div>
    </div>
  )
}

export default ScrollRefComponent
