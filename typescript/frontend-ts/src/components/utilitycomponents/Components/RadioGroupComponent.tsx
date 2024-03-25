import { FieldValues, UseFormReturn, Path } from 'react-hook-form'
import {
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from '@/src/@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/src/@/components/ui/radio-group'

type RadioGroupArray = { value: string; label: string }[]

interface RadioGroupComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  name: TName
  radioGroupArray: RadioGroupArray
  label: string
}

export const RadioGroupComponent = ({
  methods,
  label,
  name,
  radioGroupArray,
}: RadioGroupComponentProps) => {
  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4 space-y-3">
          <FormLabel className="text-sm md:text-base">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col gap-4 lg:flex-row"
            >
              {radioGroupArray.map((item) => {
                return (
                  <FormItem
                    key={item.value}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={item.value} />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                )
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
