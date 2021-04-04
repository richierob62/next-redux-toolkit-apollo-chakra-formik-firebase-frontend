import { BaseProps, FormControl } from '../form_parts';
import React, { FC, ReactNode } from 'react';
import { Stack, StackProps } from '@chakra-ui/react';

export type CheckboxGroupControlProps = BaseProps & {
  stackProps?: StackProps;
  children: ReactNode;
};

export const CheckboxGroupControl: FC<CheckboxGroupControlProps> = (
  props: CheckboxGroupControlProps
) => {
  const { name, label, children, stackProps, ...rest } = props;

  return (
    <FormControl name={name} label={label} {...rest}>
      <Stack pl={6} mt={1} spacing={1} {...stackProps}>
        {children}
      </Stack>
    </FormControl>
  );
};

export default CheckboxGroupControl;
