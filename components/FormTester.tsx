import * as React from 'react';
import * as Yup from 'yup';

import { Box, Button, Flex, HStack, Radio } from '@chakra-ui/react';

import CheckboxChildControl from './form_parts/CheckboxChildControl';
import CheckboxControl from './form_parts/CheckboxControl';
import CheckboxGroupControl from './form_parts/CheckboxGroupControl';
import { Formik } from 'formik';
import InputControl from './form_parts/InputControl';
import NumberInputControl from './form_parts/NumberInputControl';
import PercentComplete from './form_parts/PercentCompleteControl';
import PinInputControl from './form_parts/PinInputControl';
import RadioGroupControl from './form_parts/RadioGroupControl';
import ResetButtonControl from './form_parts/ResetButtonControl';

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
  toppings: [],
  age: 0,
  pin: '',
  favoriteColor: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  employed: Yup.boolean().equals([true], 'You must be employed'),
  toppings: Yup.array().min(1, 'Select at least 1 topping'),
  age: Yup.number()
    .required('You must enter your age')
    .min(18, 'You have to be 18 or older'),
  pin: Yup.string()
    .length(4, 'enter all 4 digits')
    .required('Your PIN is required'),
  favoriteColor: Yup.string().required('choose a color'),
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

          <CheckboxGroupControl name="toppings" label="Toppings">
            <CheckboxChildControl name="toppings" value="chicken">
              Chicken
            </CheckboxChildControl>
            <CheckboxChildControl name="toppings" value="ham">
              Ham
            </CheckboxChildControl>
            <CheckboxChildControl name="toppings" value="mushrooms">
              Mushrooms
            </CheckboxChildControl>
            <CheckboxChildControl name="toppings" value="cheese">
              Cheese
            </CheckboxChildControl>
            <CheckboxChildControl name="toppings" value="tuna">
              Tuna
            </CheckboxChildControl>
            <CheckboxChildControl name="toppings" value="pineapple">
              Pineapple
            </CheckboxChildControl>
          </CheckboxGroupControl>

          <NumberInputControl
            name="age"
            label="Age"
            helperText="Your actual age!"
          />

          <PinInputControl
            name="pin"
            pinAmount={4}
            pinInputProps={{ size: 'sm' }}
          />

          <RadioGroupControl name="favoriteColor" label="Favorite Color">
            <Radio value="#ff0000">Red</Radio>
            <Radio value="#00ff00">Green</Radio>
            <Radio value="#0000ff">Blue</Radio>
          </RadioGroupControl>

          <PercentComplete />

          <HStack>
            <ResetButtonControl flex="1" colorScheme="red">
              Reset
            </ResetButtonControl>

            <Button flex="1" mt={4} type="submit" colorScheme="teal">
              Submit
            </Button>
          </HStack>

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
