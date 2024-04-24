import { getLogin, logout } from '../../requests/login'
import { SyntheticEvent, useState } from 'react'

import LoginForm from './LoginForm'
import useUserContext from '../../hooks/contextHooks/useUserContext'
import { Dialog } from '../../@/components/ui/dialog'

import { useToast } from '../../@/components/ui/use-toast'
import { AxiosError } from 'axios'

import { Button } from '@/src/@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/@/components/ui/dropdown-menu'
import { User2Icon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

const LoginComponent = () => {
  const { toast } = useToast()
  const { user, dispatch } = useUserContext()
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

  const loginMutation = useMutation({
    mutationFn: () => getLogin(userName, password),
    onSuccess(data) {
      if (data.success && user === false) {
        dispatch({ type: 'LOGIN' })
        toast({ duration: 1500, title: 'Inloggad' })
      }
    },
    onError(error) {
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
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess(data) {
      if (data.success) {
        dispatch({ type: 'LOGOUT' })
        toast({ duration: 1500, title: 'Utloggad.' })
      }
    },
    onError: () =>
      toast({
        duration: 1500,
        variant: 'destructive',
        title: 'Något gick fel',
      }),
  })

  const handleResponse = async (event: SyntheticEvent) => {
    event.preventDefault()
    loginMutation.mutate()
    setShowLoginModal(false)
  }

  const loggaUt = async () => {
    logoutMutation.mutate()
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <User2Icon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user ? (
            <DropdownMenuItem onClick={() => loggaUt()}>
              Logga ut
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setShowLoginModal(true)}>
              Logga in
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
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
    </div>
  )
}

export default LoginComponent
