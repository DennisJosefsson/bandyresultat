const copyText = async (url) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(url)
  } else {
    return document.execCommand('copy', true, url)
  }
}

export const handleCopyClick = (event, compareLink, setIsCopied) => {
  event.preventDefault()
  copyText(compareLink)
    .then(() => {
      setIsCopied(true)
    })
    .catch((err) => {
      console.log(err)
    })
}
