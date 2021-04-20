import * as React from 'react';
import * as Yup from 'yup';

import { Box, Flex, HStack, Radio } from '@chakra-ui/react';

import CheckboxChildControl from './form_parts/CheckboxChildControl';
import CheckboxControl from './form_parts/CheckboxControl';
import CheckboxGroupControl from './form_parts/CheckboxGroupControl';
import DatePickerCalendarControl from './form_parts/DatePickerCalendarControl';
import DatePickerInputControl from './form_parts/DatePickerInputControl';
import { Formik } from 'formik';
import InputControl from './form_parts/InputControl';
import MultipleFileUploadControl from './form_parts/MultipleFileUploadControl';
import NumberInputControl from './form_parts/NumberInputControl';
import PercentComplete from './form_parts/PercentCompleteControl';
import PinInputControl from './form_parts/PinInputControl';
import RadioGroupControl from './form_parts/RadioGroupControl';
import ResetButtonControl from './form_parts/ResetButtonControl';
import SelectControl from './form_parts/SelectControl';
import SliderControl from './form_parts/SliderControl';
import SubmitButton from './form_parts/SubmitButtonControl';
import SwitchControl from './form_parts/SwitchControl';
import TextareaControl from './form_parts/TextAreaControl';

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
  framework: '',
  love: 50,
  married: false,
  notes: '',
  foo: '',
  bar: '',
  image_urls: [],
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
  framework: Yup.string().required('Please select a framework'),
  love: Yup.number().max(100).min(0),
  married: Yup.boolean().equals([true], 'You must be married'),
  notes: Yup.string().required('Tell us something, please'),
  foo: Yup.date().required('Select foo date'),
  bar: Yup.date().required('Select bar date'),
  image_urls: Yup.array(
    Yup.object({
      url: Yup.string().required(),
    })
  ),
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
          maxWidth={500}
          p={6}
          m="10px auto"
          as="form"
          onSubmit={handleSubmit as any}
        >
          <InputControl
            name="firstName"
            label="First Name"
            helperText="Enter your first name here"
            inputProps={{ size: 'sm' }}
          />
          <InputControl
            name="lastName"
            label="Last Name"
            helperText="Enter your last name here"
            inputProps={{ size: 'sm' }}
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
            numberInputProps={{
              width: '100px',
            }}
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

          <SelectControl
            label="Select an Framework"
            name="framework"
            selectProps={{ placeholder: 'Select option', width: '50%' }}
          >
            <option value="react">React</option>
            <option value="angular">Angular</option>
            <option value="vue">Vue</option>
          </SelectControl>

          <SliderControl
            name="love"
            label="How much do you love React?"
            sliderProps={{ min: 0, max: 100 }}
            sliderTrackProps={{ height: 1 }}
            sliderThumbProps={{
              top: '45%',
              width: '20px',
              height: '20px',
              borderColor: 'teal.500',
            }}
          />

          <SwitchControl
            name="married"
            label="Married"
            switchProps={{ colorScheme: 'teal' }}
          />

          <TextareaControl name="notes" label="Tell us about yourself" />

          <DatePickerCalendarControl
            name="foo"
            label="Foo Label"
            disabledDays={{ daysOfWeek: [0] }}
            // month={new Date('05-01-2021')}
            modifiers={{
              highlighted: new Date('4-30-2021'),
            }}
          />

          <DatePickerInputControl
            name="bar"
            label="Bar Label"
            month={new Date('12-1-2021')}
            showWeekNumbers={true}
            todayButton="Today"
          />

          <MultipleFileUploadControl name="image_urls" />

          <PercentComplete />

          <HStack>
            <ResetButtonControl flex="1" colorScheme="red">
              Reset
            </ResetButtonControl>

            <SubmitButton flex="1" colorScheme="teal">
              Submit
            </SubmitButton>
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
