import { FormControl, useFormField } from '@/src/@/components/ui/form'
import { Checkbox } from '@/src/@/components/ui/checkbox'
import { useController } from 'react-hook-form'

const SingleCheckboxComponent = () => {
  const { name, id } = useFormField()

  const { field } = useController({ name })
  return (
    <FormControl>
      <Checkbox
        checked={field.value}
        onCheckedChange={field.onChange}
        id={id}
      />
    </FormControl>
  )
}

export default SingleCheckboxComponent
