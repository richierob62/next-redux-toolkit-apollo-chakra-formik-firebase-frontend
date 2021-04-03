import * as React from 'react';
import * as Yup from 'yup';

import { Box, Button, Flex } from '@chakra-ui/react';

import { CheckboxControl } from './form_parts/CheckboxControl';
import { Formik } from 'formik';
import InputControl from './form_parts/InputControl';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = (values: any) => {
  sleep(300).then(() => {
    window.alert(JSON.stringify(values, null, 2));
  });
};

const initialValues = {
  firstName: '',
  lastName: '',
  employed: false,
};
const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  employed: Yup.boolean().equals([true], 'You must be employed'),
});

const TestForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Flex
          direction="column"
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={800}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >
          <InputControl
            name="firstName"
            label="First Name"
            helperText="Enter your first name here"
          />
          <InputControl
            name="lastName"
            label="Last Name"
            helperText="Enter your last name here"
          />

          <CheckboxControl name="employed">Employed</CheckboxControl>

          <Button mt={4} type="submit" colorScheme="teal">
            Submit
          </Button>

          <Box as="pre" marginY={10}>
            {JSON.stringify(values, null, 2)}
            <br />
            {JSON.stringify(errors, null, 2)}
          </Box>
        </Flex>
      )}
    </Formik>
  );
};

export default TestForm;
