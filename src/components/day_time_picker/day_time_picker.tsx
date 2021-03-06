import React, { PureComponent } from 'react';
import moment from 'moment';
// @ts-ignore
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';

export class DayTimePicker extends PureComponent {
  public render() {
    return (
      <EuiFormRow label="Select a date">
        <EuiDatePicker selected={moment()} onChange={() => {}} />
      </EuiFormRow>
    );
  }
}
