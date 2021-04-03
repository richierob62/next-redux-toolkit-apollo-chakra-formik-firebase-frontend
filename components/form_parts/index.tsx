import {
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import React, { FC } from 'react';

import { useField } from 'formik';

export interface BaseProps extends FormControlProps {
  name: string;
  label?: string;
  helperText?: string;
}

export const FormControl: FC<BaseProps> = (props: BaseProps) => {
  const { children, name, label, helperText, ...rest } = props;
  const [, { error, touched }] = useField(name);

  return (
    <ChakraFormControl mt={3} isInvalid={!!error && touched} {...rest}>
      {label && (
        <FormLabel mb={0} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      {children}
      {error && (
        <FormErrorMessage mt={0} lineHeight="normal">
          {error}
        </FormErrorMessage>
      )}
      {helperText && !error && (
        <FormHelperText mt={0}>{helperText}</FormHelperText>
      )}
    </ChakraFormControl>
  );
};

export default FormControl;
