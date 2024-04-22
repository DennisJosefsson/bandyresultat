import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/src/@/components/ui/form'
import { Textarea } from '@/src/@/components/ui/textarea'
import { FieldValues, UseFormReturn, Path } from 'react-hook-form'
import { cn } from '@/src/@/lib/utils'

interface TextAreaComponentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  methods: UseFormReturn<TFieldValues>
  label: string
  placeholder: string
  description: string
  name: TName
  className?: string
}

const TextAreaComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  methods,
  name,
  label,
  placeholder,
  description,
  className,
}: TextAreaComponentProps<TFieldValues, TName>) => {
  return (
    <>
      <FormField
        control={methods.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm md:text-base">{label}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                {...field}
                className={cn('resize-none', className)}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export default TextAreaComponent
