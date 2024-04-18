import { Button } from '@/src/@/components/ui/button'
import { Input } from '@/src/@/components/ui/input'
import { Label } from '@/src/@/components/ui/label'
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from '@/src/@/components/ui/dialog'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

type ComponentProps = {
  userName: string
  password: string
  setUserName: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
  setShowModal: Dispatch<SetStateAction<boolean>>
  handleResponse: (event: SyntheticEvent) => Promise<void>
}

const LoginForm = ({
  userName,
  setUserName,
  password,
  setPassword,
  handleResponse,
  setShowModal,
}: ComponentProps) => {
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inloggning</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleResponse} id="loginForm">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Namn
              </Label>
              <Input
                className="col-span-3"
                type="text"
                name="userName"
                autoComplete="new-userName"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Lösenord
              </Label>
              <Input
                className="col-span-3"
                type="password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button variant="destructive" onClick={() => setShowModal(false)}>
            Stäng
          </Button>
          <Button type="submit" form="loginForm">
            Skicka
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}

export default LoginForm
