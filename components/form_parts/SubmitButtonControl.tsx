import { Button, ButtonProps } from '@chakra-ui/react';
import React, { FC } from 'react';

import { useFormikContext } from 'formik';

export type SubmitButtonProps = ButtonProps;

export const SubmitButton: FC<SubmitButtonProps> = (
  props: SubmitButtonProps
) => {
  const { children, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <Button type="submit" isLoading={isSubmitting} {...rest}>
      {children}
    </Button>
  );
};

export default SubmitButton;
