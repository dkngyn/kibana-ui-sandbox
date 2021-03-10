import React, { PureComponent, MouseEvent } from 'react';
import moment from 'moment';
import { upperFirst } from 'lodash';
import {
  // @ts-ignore
  EuiDatePicker,
  // @ts-ignore
  EuiFormRow,
  EuiFormControlLayout,
  // @ts-ignore
  EuiFieldText,
  EuiIcon,
  EuiPopover,
} from '@elastic/eui';
import { RecurData, Datum } from './typings';
import { WeekDay, dayOfWeekCodes } from './weekday';

interface Props {
  recurData: RecurData[];
  onSelect: (datum: RecurData[]) => void;
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
      recurData: props.recurData != null ? props.recurData : [],
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
      if (datum.selected) hourSet.add(hour);
      else hourSet.delete(hour);
    } else {
      this.collection.set(day, new Set<number>().add(hour));
    }

    const recurData = [];
    // @ts-ignore
    for (const [k, v] of this.collection.entries()) {
      if (v.size > 0) {
        const recur = {
          dayOfWeek: k as number,
          hourOfDay: Array.from(v) as number[],
        };
        recurData.push(recur);
      }
    }

    this.setState({ recurData });
    this.props.onSelect(recurData);
  };

  private toggleIsPopoverOpen = (shouldOpen: boolean) => {
    this.setState({ isPopoverOpen: shouldOpen });
  };

  private onClearInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ recurData: [] });
  };

  private renderWeekDays() {
    const clear = this.state.recurData.length > 0 ? { onClick: this.onClearInput } : {};
    const weekDays = Object.keys(dayOfWeekCodes).map((day, i) => (
      <WeekDay
        key={i}
        day={day}
        onSelect={this.handleSelect}
        recurData={this.state.recurData.find((r) => String(r.dayOfWeek) === day)}
      />
    ));
    const input = (
      <EuiFormControlLayout clear={{ onClick: this.onClearInput }}>
        <input
          className="euiFieldText euiFieldText--withIcon "
          value={this.state.inputValue}
          onChange={() => {}}
          onFocus={() => this.toggleIsPopoverOpen(true)}
        />
        <div className="euiFormControlLayoutIcons">
          <span className="euiFormControlLayoutCustomIcon">
            <EuiIcon type="calendar" />
          </span>
        </div>
      </EuiFormControlLayout>
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
