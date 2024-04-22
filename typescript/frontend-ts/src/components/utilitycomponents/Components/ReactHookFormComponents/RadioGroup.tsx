import {
  FormControl,
  FormItem,
  FormLabel,
  useFormField,
} from '@/src/@/components/ui/form'

import { RadioGroup, RadioGroupItem } from '@/src/@/components/ui/radio-group'
import { HTMLAttributes } from 'react'
import { useController } from 'react-hook-form'

type RadioGroupArray = { value: string; label: string }[]

interface RadioGroupComponentProps extends HTMLAttributes<HTMLDivElement> {
  radioGroupArray: RadioGroupArray
}

const RadioGroupComponent = ({
  radioGroupArray,
  ...otherProps
}: RadioGroupComponentProps) => {
  const { name, id } = useFormField()

  const { field } = useController({ name })
  return (
    <FormControl>
      <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
        <div {...otherProps}>
          {radioGroupArray.map((item) => {
            return (
              <FormItem
                key={item.value}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={item.value} id={id} />
                </FormControl>
                <FormLabel className="font-normal">{item.label}</FormLabel>
              </FormItem>
            )
          })}
        </div>
      </RadioGroup>
    </FormControl>
  )
}

export default RadioGroupComponent
