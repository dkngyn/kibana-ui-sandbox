import React, { PureComponent } from 'react';
import moment from 'moment';
// @ts-ignore
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import { dayOfWeekCodes } from './consts';

export class DayTimePicker extends PureComponent {
  public render() {
    return (
      <>
        <EuiFormRow label="Select a date">
          <EuiDatePicker selected={moment()} onChange={() => {}} />
        </EuiFormRow>
        <br />
        <hr />
        <br />
        <div className="daytime-picker">{this.renderDaysOfWeek()}</div>
      </>
    );
  }

  private renderDaysOfWeek() {
    const weekDays = Object.values(dayOfWeekCodes).map((weekday, i) => (
      <div key={i} className="daytime-picker__weekday">
        {weekday}
      </div>
    ));
    return <div className="daytime-picker__weekdays">{weekDays}</div>;
  }
}
