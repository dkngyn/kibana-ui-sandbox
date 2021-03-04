import React, { useState } from 'react';
import moment from 'moment';
// @ts-ignore
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';

export function DayTimePicker() {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = (date: any) => {
    console.log(date, typeof date);
    setStartDate(date);
  };

  return (
    <EuiFormRow label="Select a date">
      <EuiDatePicker selected={startDate} onChange={handleChange} />
    </EuiFormRow>
  );
}
