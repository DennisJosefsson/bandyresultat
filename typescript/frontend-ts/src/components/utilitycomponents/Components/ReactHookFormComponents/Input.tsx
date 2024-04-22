import { FormControl, useFormField } from '@/src/@/components/ui/form'
import { Input, InputProps } from '@/src/@/components/ui/input'

import { useController } from 'react-hook-form'

function InputComponent({ ...props }: InputProps) {
  const { name, id } = useFormField()

  const { field } = useController({ name })

  return (
    <FormControl>
      <Input {...props} {...field} id={id} />
    </FormControl>
  )
}

export default InputComponent
