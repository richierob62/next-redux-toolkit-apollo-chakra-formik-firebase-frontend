import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import React, { FC } from 'react';

import { useField } from 'formik';

type ChangeType<OriginalType, NewType> = Pick<
  OriginalType,
  Exclude<keyof OriginalType, keyof NewType>
> &
  NewType;

export type CheckboxChildControlProps = ChangeType<
  CheckboxProps,
  { value: string | number }
> & { name: string; label?: string };

export const CheckboxChildControl: FC<CheckboxChildControlProps> = (
  props: CheckboxChildControlProps
) => {
  const { name, label, children, ...rest } = props;
  const [field, { error, touched }] = useField(name);
  // field.value is an array
  const isChecked = field.value.includes(props.value) ?? false;

  return (
    <Checkbox
      {...field}
      isInvalid={!!error && touched}
      isChecked={isChecked}
      {...rest}
    >
      {label}
      {children}
    </Checkbox>
  );
};

export default CheckboxChildControl;
