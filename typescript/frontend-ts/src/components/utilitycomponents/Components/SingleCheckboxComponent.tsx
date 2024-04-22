import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from '@/src/@/components/ui/form'
import { Checkbox } from '@radix-ui/react-checkbox'
import { Path, FieldValues, UseFormReturn } from 'react-hook-form'

interface CheckboxComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  description: string
  name: TName

  label: string
}

const SingleCheckboxComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  methods,
  name,
  description,

  label,
}: CheckboxComponentProps<TFieldValues, TName>) => {
  return (
    <>
      <FormField
        control={methods.control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
          </FormItem>
        )}
      />
    </>
  )
}

export default SingleCheckboxComponent
