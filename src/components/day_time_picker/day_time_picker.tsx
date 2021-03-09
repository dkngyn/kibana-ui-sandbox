import React, { PureComponent } from 'react';
import moment from 'moment';
import { upperFirst } from 'lodash';
// @ts-ignore
import { EuiDatePicker, EuiFormRow, EuiFieldText, EuiIcon } from '@elastic/eui';
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

interface State {
  inputValue: string;
  recurData: RecurData[];
}

export class DayTimePicker extends PureComponent<Props, State> {
  private readonly collection: Map<number, Set<number>>;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      recurData: [],
    };

    this.collection = new Map<number, Set<number>>();
  }

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (prevState.recurData.length !== this.state.recurData.length) {
      const days = this.state.recurData
        .map((d) => d.dayOfWeek)
        .sort()
        .map((d) => upperFirst(dayOfWeekCodes[d]));
      this.setState({ inputValue: days.join(', ') });
    }
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
        <div className="daytime-picker">
          {this.renderInput()}
          {this.renderWeekDays()}
        </div>
      </>
    );
  }

  private handleSelect = (datum: Datum) => {
    // eslint-disable-next-line no-console
    console.log(datum);

    const { day, hour } = datum;
    const hourSet = this.collection.get(day);
    if (hourSet != null) {
      hourSet.add(hour);
    } else {
      this.collection.set(day, new Set<number>().add(hour));
    }

    const recurData = [];
    // @ts-ignore
    for (const [k, v] of this.collection.entries()) {
      const recur = {
        dayOfWeek: k,
        hourOfDay: Array.from(v) as number[],
      };
      recurData.push(recur);
    }

    this.setState({ recurData }, () => {
      // eslint-disable-next-line no-console
      console.log(this.state.recurData);
    });
  };

  private renderInput() {
    const { inputValue } = this.state;
    return (
      <EuiFieldText prepend={<EuiIcon type="calendar" />} value={inputValue} onChange={() => {}} />
    );
  }

  private renderWeekDays() {
    const weekDays = Object.keys(dayOfWeekCodes).map((day, i) => (
      <WeekDay key={i} day={day} onSelect={this.handleSelect} />
    ));
    return <div className="daytime-picker__weekdays">{weekDays}</div>;
  }
}
