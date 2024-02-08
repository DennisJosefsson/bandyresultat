import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getLinkData } from '../../requests/link'

const Link = () => {
  const [error, setError] = useState({ success: false, message: 'Väntar...' })
  const navigate = useNavigate()
  const linkName = useParams().linkName

  useEffect(() => {
    const getData = async () => {
      const linkData = await getLinkData(linkName)
      
      if (!linkData.success) {
        setError(linkData)
      } else if (linkData.success && linkData.origin === 'search') {
        setError({ success: false, message: 'Felaktig länk, fel LänkId.' })
      } else if (linkData.success && linkData.origin === 'compare') {
        setError({ sucess: linkData.success, message: linkData.message })
        navigate('/teams', { state: { compObject: linkData.searchString } })
      }
    }

    const regex = /link\d{7,}/gm

    if (!linkName.match(regex)) {
      setError({ success: false, message: 'Felaktig länk' })
    } else {
      getData()
    }
  }, [linkName, navigate])

  return (
    <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
      {error.success === false && <span>{error.message}</span>}
    </div>
  )
}

export default Link
