import { Button, ButtonProps } from '@chakra-ui/react';
import React, { FC } from 'react';

import { useFormikContext } from 'formik';

export type ResetButtonControlProps = ButtonProps;

export const ResetButtonControl: FC<ResetButtonControlProps> = (
  props: ResetButtonControlProps
) => {
  const { children, ...rest } = props;
  const { isSubmitting, dirty, resetForm } = useFormikContext();

  return (
    <Button
      colorScheme="teal"
      variant="outline"
      onClick={() => resetForm()}
      isDisabled={isSubmitting || !dirty}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ResetButtonControl;
