import 'react-day-picker/lib/style.css';
import 'moment/locale/it';

import { BaseProps, FormControl } from '.';
import DayPicker, { Modifiers } from 'react-day-picker';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import React, { FC } from 'react';

import { Box } from '@chakra-ui/react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { css } from '@emotion/react';
import { useField } from 'formik';

export type DatePickerInputControlProps = BaseProps & {
  disabledDays?: { daysOfWeek: number[] };
  modifiers?: Partial<Modifiers>;
  month?: Date;
  showWeekNumbers?: boolean;
  todayButton?: string;
};

export const DatePickerInputControl: FC<DatePickerInputControlProps> = (
  props: DatePickerInputControlProps
) => {
  const {
    name,
    label,
    disabledDays,
    modifiers,
    month,
    showWeekNumbers,
    todayButton,
    ...rest
  } = props;
  const [field, , { setValue }] = useField(name);

  const dayPickerProps: any = {};
  if (month) dayPickerProps.month = month;
  if (showWeekNumbers) dayPickerProps.showWeekNumbers = showWeekNumbers;
  if (todayButton) dayPickerProps.todayButton = todayButton;

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
        .DayPicker-wrapper {
          padding: 10px;
        }
        input {
          transition: all 0.2s;
          font-size: 0.875rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          height: 2rem;
          border-radius: 0.125rem;
          border: 1px solid rgb(226, 232, 240);
        }
      `}
    >
      <FormControl name={name} label={label} {...rest}>
        <DayPickerInput
          onDayChange={handleChange}
          dayPickerProps={dayPickerProps}
          formatDate={formatDate}
          parseDate={parseDate}
          placeholder={`${formatDate(new Date())}`}
        />
        {/* <DayPicker
          modifiers={modifiers}
          onDayClick={handleChange}
          selectedDays={field.value}
          disabledDays={disabledDays}
          month={month || new Date()}
        /> */}
      </FormControl>
    </Box>
  );
};

export default DatePickerInputControl;
