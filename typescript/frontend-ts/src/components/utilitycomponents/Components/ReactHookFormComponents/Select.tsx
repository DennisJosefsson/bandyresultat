import { useFormField, FormControl } from '@/src/@/components/ui/form'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/src/@/components/ui/select'
import { useController } from 'react-hook-form'

type SelectComponentProps = {
  selectionArray: {
    value: number
    label: string
  }[]
  placeholder: string
}

const SelectComponent = ({
  selectionArray,
  placeholder,
}: SelectComponentProps) => {
  const { name } = useFormField()
  const { field } = useController({ name })
  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value.toString()}
      value={field.value.toString()}
    >
      <FormControl>
        <SelectTrigger className="ml-px">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {selectionArray.map((item) => {
          return (
            <SelectItem
              key={`${String(name)}-${item.value}`}
              value={
                typeof item.value === 'string'
                  ? item.value
                  : item.value.toString()
              }
            >
              {item.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default SelectComponent
