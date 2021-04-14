import 'react-day-picker/lib/style.css';

import { BaseProps, FormControl } from '.';
import DayPicker, { Modifiers } from 'react-day-picker';
import React, { FC } from 'react';

import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useField } from 'formik';

export type DatePickerCalendarControlProps = BaseProps & {
  disabledDays?: { daysOfWeek: number[] };
  modifiers?: Partial<Modifiers>;
  month?: Date;
};

export const DatePickerCalendarControl: FC<DatePickerCalendarControlProps> = (
  props: DatePickerCalendarControlProps
) => {
  const { name, label, disabledDays, modifiers, month, ...rest } = props;
  const [field, , { setValue }] = useField(name);

  // http://react-day-picker.js.org/docs/matching-days for more modifiers

  function handleChange(day: Date) {
    if (DayPicker.ModifiersUtils.dayMatchesModifier(day, disabledDays)) return;
    setValue(day);
  }

  return (
    <Box
      css={css`
        .DayPicker {
          font-size: 0.875rem;
        }
        .DayPicker-Day {
          padding: 0;
          width: 35px;
          height: 35px;
        }
        .DayPicker-Day--selected,
        .DayPicker-Day--disabled {
          outline: none;
        }
        .DayPicker-Day--highlighted:not(.DayPicker-Day--outside) {
          background-color: orange;
          color: white;
        }
      `}
    >
      <FormControl name={name} label={label} {...rest}>
        <DayPicker
          modifiers={modifiers}
          onDayClick={handleChange}
          selectedDays={field.value}
          disabledDays={disabledDays}
          month={month || new Date()}
        />
      </FormControl>
    </Box>
  );
};

export default DatePickerCalendarControl;
