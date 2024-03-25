import {
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
  FormItem,
} from '@/src/@/components/ui/form'
import { Input } from '@/src/@/components/ui/input'
import { FieldValues, UseFormReturn, Path } from 'react-hook-form'

interface InputComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  label: string
  placeholder: string
  description: string
  name: TName
}

export const InputComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  methods,
  name,
  label,
  placeholder,
  description,
}: InputComponentProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-[200px] md:w-[232px]">
          <FormLabel className="text-sm md:text-base">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="ml-px max-w-[20rem]"
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
