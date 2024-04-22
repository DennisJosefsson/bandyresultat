import {
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormDescription,
  FormItem,
} from '@/src/@/components/ui/form'
import { Input } from '@/src/@/components/ui/input'
import { ReactNode } from 'react'
import { FieldValues, UseFormReturn, Path } from 'react-hook-form'

interface InputComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  placeholder: string
  name: TName
  children: ReactNode
}

export function InputComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  methods,
  name,
  children,
  placeholder,
}: InputComponentProps<TFieldValues, TName>) {
  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-[200px] md:w-[232px]">
          {children}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="ml-px max-w-[20rem]"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

InputComponent.Label = Label
InputComponent.Description = Description

function Label({ children, ...otherProps }: { children: ReactNode }) {
  return <FormLabel {...otherProps}>{children}</FormLabel>
}

function Description({ children, ...otherProps }: { children: ReactNode }) {
  return <FormDescription {...otherProps}>{children}</FormDescription>
}
