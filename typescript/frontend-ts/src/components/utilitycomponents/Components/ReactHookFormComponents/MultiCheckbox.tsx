import { Checkbox } from '@/src/@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useFormField,
} from '@/src/@/components/ui/form'
import { HTMLAttributes } from 'react'

type CheckboxArray = { value: string | number; label: string }[]

interface MultiCheckboxComponentProps extends HTMLAttributes<HTMLDivElement> {
  checkboxArray: CheckboxArray
}

function MultiCheckboxComponent({
  checkboxArray,
  ...otherProps
}: MultiCheckboxComponentProps) {
  const { name, control, id } = useFormField()
  return (
    <div {...otherProps}>
      {checkboxArray.map((item) => (
        <FormField
          key={item.value}
          control={control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem
                key={item.value}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    id={id}
                    checked={field.value?.includes(item.value)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange([...field.value, item.value])
                        : field.onChange(
                            field.value?.filter(
                              (value: string) => value !== item.value,
                            ),
                          )
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {item.label}
                </FormLabel>
              </FormItem>
            )
          }}
        />
      ))}
    </div>
  )
}

export default MultiCheckboxComponent
