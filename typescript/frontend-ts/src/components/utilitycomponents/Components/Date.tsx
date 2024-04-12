import dayjs from 'dayjs'
import 'dayjs/locale/sv'
dayjs.locale('sv')

const Date = ({
  children,
  className,
}: {
  children: string | number | undefined | null
  className?: string | undefined
}) => {
  if (typeof children === ('string' || 'number'))
    return (
      <span className={className}>{dayjs(children).format('D MMMM YYYY')}</span>
    )
  else return <span>Saknar speldatum</span>
}

export default Date
