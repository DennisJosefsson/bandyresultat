import { Dispatch, SetStateAction } from 'react'

const copyText = async (url: string) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(url)
  } else {
    return document.execCommand('copy', true, url)
  }
}

export const handleCopyClick = (
  event: Event,
  compareLink: string,
  setIsCopied: Dispatch<SetStateAction<boolean>>,
) => {
  event.preventDefault()
  copyText(compareLink)
    .then(() => {
      setIsCopied(true)
    })
    .catch((err) => {
      console.log(err)
    })
}
