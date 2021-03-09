import React, { PureComponent } from 'react';
import moment from 'moment';
import { upperFirst } from 'lodash';
// @ts-ignore
import { EuiDatePicker, EuiFormRow, EuiFieldText, EuiIcon, EuiPopover } from '@elastic/eui';
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
  isPopoverOpen: boolean;
}

export class DayTimePicker extends PureComponent<Props, State> {
  private readonly collection: Map<number, Set<number>>;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      recurData: [],
      isPopoverOpen: false,
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
        <div className="daytime-picker">{this.renderWeekDays()}</div>
      </>
    );
  }

  private handleSelect = (datum: Datum) => {
    // eslint-disable-next-line no-console
    console.log(datum);

    const day = parseInt(datum.day, 10);
    const hour = parseInt(datum.hour, 10);
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
        dayOfWeek: k as number,
        hourOfDay: Array.from(v) as number[],
      };
      recurData.push(recur);
    }

    this.setState({ recurData }, () => {
      // eslint-disable-next-line no-console
      console.log(this.state.recurData);
    });
  };

  private toggleIsPopoverOpen = (shouldOpen: boolean) => {
    this.setState({ isPopoverOpen: shouldOpen });
  };

  private renderWeekDays() {
    const weekDays = Object.keys(dayOfWeekCodes).map((day, i) => (
      <WeekDay key={i} day={day} onSelect={this.handleSelect} />
    ));
    const input = (
      <EuiFieldText
        prepend={<EuiIcon type="calendar" />}
        value={this.state.inputValue}
        onChange={() => {}}
        onFocus={() => this.toggleIsPopoverOpen(true)}
      />
    );
    return (
      <EuiPopover
        button={input}
        isOpen={this.state.isPopoverOpen}
        closePopover={() => this.toggleIsPopoverOpen(false)}
        ownFocus
        anchorPosition="downCenter"
      >
        <div className="daytime-picker__weekdays">{weekDays}</div>
      </EuiPopover>
    );
  }
}
