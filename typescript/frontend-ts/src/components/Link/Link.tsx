import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLinkData } from '../../requests/link'
import { link, LinkState } from '../types/link/link'

const Link = () => {
  const [error, setError] = useState<LinkState>({
    success: false,
    message: 'Väntar...',
  })
  const navigate = useNavigate()
  const linkName = link.safeParse(useParams().linkName)

  useEffect(() => {
    const getData = async (linkParam: string) => {
      const linkData = await getLinkData(linkParam)

      if (!linkData.success) {
        setError(linkData)
      } else if (linkData.success && linkData.origin === 'search') {
        setError({ success: false, message: 'Felaktig länk, fel LänkId.' })
      } else if (linkData.success && linkData.origin === 'compare') {
        setError({ success: linkData.success, message: linkData.message })
        navigate('/teams', { state: { compObject: linkData.searchString } })
      }
    }

    if (!linkName.success) {
      setError({ success: false, message: 'Felaktig länk, fel LänkId.' })
    } else {
      getData(linkName.data)
    }
  }, [linkName, navigate])

  return (
    <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
      {error.success === false && <span>{error.message}</span>}
    </div>
  )
}

export default Link
