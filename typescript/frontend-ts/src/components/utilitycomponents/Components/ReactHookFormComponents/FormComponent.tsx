import {
  FormField,
  FormLabel,
  FormMessage,
  FormDescription,
  FormItem,
  useFormField,
} from '@/src/@/components/ui/form'

import { ReactNode } from 'react'
import { FieldValues, UseFormReturn, Path } from 'react-hook-form'
import Input from './Input'
import Textarea from './Textarea'
import MultiCheckbox from './MultiCheckbox'
import SingleCheckbox from './SingleCheckbox'
import Select from './Select'
import RadioGroup from './RadioGroup'

interface FormComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  name: TName
  children: ReactNode
}

export function FormComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({ methods, name, children }: FormComponentProps<TFieldValues, TName>) {
  return (
    <FormField
      control={methods.control}
      name={name}
      render={() => (
        <FormItem>
          {children}

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

FormComponent.Label = Label
FormComponent.Description = Description
FormComponent.Input = Input
FormComponent.Textarea = Textarea
FormComponent.MultiCheckbox = MultiCheckbox
FormComponent.SingleCheckbox = SingleCheckbox
FormComponent.Select = Select
FormComponent.RadioGroup = RadioGroup

function Label({ children, ...otherProps }: { children: ReactNode }) {
  const { id } = useFormField()
  return (
    <FormLabel {...otherProps} htmlFor={id}>
      {children}
    </FormLabel>
  )
}

function Description({ children, ...otherProps }: { children: ReactNode }) {
  return <FormDescription {...otherProps}>{children}</FormDescription>
}
