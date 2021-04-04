import { Box, BoxProps, Progress, ProgressProps } from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';

import { useFormikContext } from 'formik';

type ProgressFn = (numFields: number, numerrors: number) => any;

const calculateProgress: ProgressFn = (numFields, numErrors) => {
  const validFields = numFields - numErrors;
  return (validFields / numFields) * 100;
};

export type PercentCompleteProps = {
  progressProps?: ProgressProps;
  progressFn?: ProgressFn;
} & BoxProps;

export const PercentComplete: FC<PercentCompleteProps> = (
  props: PercentCompleteProps
) => {
  const { progressFn = calculateProgress, progressProps, ...rest } = props;
  const { errors, values, validateForm, dirty } = useFormikContext();
  const numFields = Object.keys(values as object).length;
  const numErrors = Object.keys(errors).length;

  useEffect(() => {
    validateForm();
  }, [dirty]);

  return (
    <Box marginY={5} {...rest}>
      <Progress
        hasStripe
        colorScheme="teal"
        isAnimated
        value={progressFn(numFields, numErrors)}
        {...progressProps}
      />
    </Box>
  );
};

export default PercentComplete;
