import React, { PureComponent } from 'react';
import moment from 'moment';
// @ts-ignore
import { EuiDatePicker, EuiFormRow } from '@elastic/eui';
import { dayOfWeekCodes } from './consts';
import { WeekDay } from './weekday';
import { Datum } from './dayhour';

export interface RecurData {
  dayOfWeek: number;
  hourOfDay: number[];
}

interface Props {
  onSelect?: (datum: RecurData[]) => void;
}

export class DayTimePicker extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

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

  private handleSelect = (datum: Datum) => {
    // eslint-disable-next-line no-console
    console.log(datum);
  };

  private renderWeekDays() {
    const weekDays = Object.values(dayOfWeekCodes).map((day, i) => (
      <WeekDay key={i} day={day} onSelect={this.handleSelect} />
    ));
    return <div className="daytime-picker__weekdays">{weekDays}</div>;
  }
}
