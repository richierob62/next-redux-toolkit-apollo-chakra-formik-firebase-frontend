import { BaseProps, FormControl } from '../form_parts';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

import { useField } from 'formik';

export type CheckboxControlProps = BaseProps & {
  checkBoxProps?: CheckboxProps;
  children: ReactNode;
};

const CheckboxControl: FC<CheckboxControlProps> = (
  props: CheckboxControlProps
) => {
  const { name, label, children, checkBoxProps, ...rest } = props;
  const [field, { error, touched }] = useField(name);
  const isChecked = field.value;

  return (
    <FormControl name={name} {...rest}>
      <Checkbox
        {...field}
        id={name}
        isInvalid={!!error && touched}
        isChecked={isChecked}
        {...checkBoxProps}
      >
        {label}
        {children}
      </Checkbox>
    </FormControl>
  );
};

export default CheckboxControl;
