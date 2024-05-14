import {
  FormField,
  FormLabel,
  FormMessage,
  FormDescription,
  FormItem,
  useFormField,
} from '@/src/@/components/ui/form'

import { ReactNode, HTMLAttributes } from 'react'
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
> extends HTMLAttributes<HTMLDivElement> {
  methods: UseFormReturn<TFieldValues>
  name: TName
  children: ReactNode
}

export function FormComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  methods,
  name,
  children,
  ...otherProps
}: FormComponentProps<TFieldValues, TName>) {
  return (
    <FormField
      control={methods.control}
      name={name}
      render={() => (
        <div {...otherProps}>
          <FormItem>
            {children}

            <FormMessage />
          </FormItem>
        </div>
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
