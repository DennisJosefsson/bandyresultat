import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import useTeampreferenceContext from '@/src/hooks/contextHooks/useTeampreferenceContext'
import { ReactNode } from 'react'

const PlayoffCard = ({
  styleClass = '',
  children,
}: {
  styleClass?: string
  children: ReactNode
}) => {
  return <Card className={styleClass}>{children}</Card>
}

function Title({ children }: { children: ReactNode }) {
  return (
    <CardHeader>
      <CardTitle>
        <div className="flex flex-row justify-between text-sm lg:text-base">
          {children}
        </div>
      </CardTitle>
    </CardHeader>
  )
}

function Group({ children }: { children: ReactNode }) {
  return <span>{children}</span>
}

function Result({ children }: { children: ReactNode }) {
  return <span>{children}</span>
}

function Content({ children }: { children: ReactNode }) {
  return <CardContent className="text-xs md:text-sm">{children}</CardContent>
}

function Team({ teamId, children }: { teamId: number; children: ReactNode }) {
  const { favTeams } = useTeampreferenceContext()
  return (
    <span className={favTeams.includes(teamId) ? 'font-bold' : undefined}>
      {children}
    </span>
  )
}

PlayoffCard.Title = Title
PlayoffCard.Group = Group
PlayoffCard.Result = Result
PlayoffCard.Content = Content
PlayoffCard.Team = Team

export default PlayoffCard
