import { FormControl, useFormField } from '@/src/@/components/ui/form'
import { Textarea, TextareaProps } from '@/src/@/components/ui/textarea'

import { useController } from 'react-hook-form'

function TextareaComponent({ ...props }: TextareaProps) {
  const { name, id } = useFormField()

  const { field } = useController({ name })

  return (
    <FormControl>
      <Textarea {...props} {...field} id={id} />
    </FormControl>
  )
}

export default TextareaComponent
