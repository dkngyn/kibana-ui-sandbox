import React, { PureComponent } from 'react';
import moment from 'moment';
// @ts-ignore
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import { dayOfWeekCodes } from './consts';
import { WeekDay } from './weekday';

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
        <div className="daytime-picker">{this.renderWeekDays()}</div>
      </>
    );
  }

  private renderWeekDays() {
    const weekDays = Object.values(dayOfWeekCodes).map((day, i) => <WeekDay key={i} day={day} />);
    return <div className="daytime-picker__weekdays">{weekDays}</div>;
  }
}
