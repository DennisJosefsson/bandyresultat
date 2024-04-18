import { getLogin, logout } from '../requests/login'
import { SyntheticEvent, useState } from 'react'
import { Button } from '../@/components/ui/button'
import LoginForm from './LoginForm/LoginForm'
import useUserContext from '../hooks/contextHooks/useUserContext'
import { Dialog } from '../@/components/ui/dialog'
import { Toaster } from '../@/components/ui/toaster'
import { useToast } from '../@/components/ui/use-toast'
import { AxiosError } from 'axios'

const Footer = () => {
  const { toast } = useToast()
  const { user, dispatch } = useUserContext()
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  const handleResponse = async (event: SyntheticEvent) => {
    event.preventDefault()
    setShowLoginModal(false)
    if (user === true) {
      toast({ variant: 'destructive', title: 'Redan inloggad.' })
      return
    }
    try {
      const response = await getLogin(userName, password)
      if (response.success && user === false) {
        dispatch({ type: 'LOGIN' })
        toast({ duration: 1500, title: 'Inloggad' })
      }
      return
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = `${error.response?.data.errors}`
        toast({
          duration: 2500,
          variant: 'destructive',
          title: 'Du får inte logga in.',
          description: message,
        })
        return
      }
    }
  }

  const loggaUt = async () => {
    const response = await logout()
    if (response.success) {
      dispatch({ type: 'LOGOUT' })
      toast({ duration: 1500, title: 'Utloggad.' })
    } else {
      toast({
        duration: 2500,
        variant: 'destructive',
        title: 'Något gick fel.',
      })
    }
  }

  return (
    <footer className="mt-auto h-[10rem] bg-background font-inter text-foreground">
      <div className="mx-auto flex max-w-7xl flex-row justify-end">
        <div className="pt-2">
          {!user ? (
            <Button onClick={() => setShowLoginModal(true)}>Logga in</Button>
          ) : (
            <Button onClick={() => loggaUt()}>Logga ut</Button>
          )}
          <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
            <LoginForm
              userName={userName}
              setUserName={setUserName}
              password={password}
              setPassword={setPassword}
              setShowModal={setShowLoginModal}
              handleResponse={handleResponse}
            />
          </Dialog>
          <Toaster />
        </div>
      </div>
    </footer>
  )
}

export default Footer
