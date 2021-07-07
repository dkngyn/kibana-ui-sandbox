/*
 * See SONAR_EULA file in the project root for full license information.
 */

import React, { createRef, PureComponent, MouseEvent, RefObject } from 'react';
import { EuiFormControlLayout } from '@elastic/eui';
import onClickOutside from 'react-onclickoutside';
import { capitalize } from 'lodash';
import classNames from 'classnames';

import { RecurDoc, Datum } from './typings';
import { dayOfWeekCodes } from './week_day';
import { hourOfDayList } from './day_hour';
import { CalendarWeek } from './calendar_week';
import { PopperComponent } from './popper_component';

const outsideClickIgnoreClass = 'daytime-picker--ignore-onClickOutside';
const WrappedCalendarWeek = onClickOutside(CalendarWeek);

interface Props {
  recurData: RecurDoc[];
  onSelect: (datum: RecurDoc[]) => void;
}

interface State {
  inputValue: string;
  recurData: RecurDoc[];
  isOpen: boolean;
}

export class DayTimePicker extends PureComponent<Props, State> {
  private readonly collection: Map<number, Set<number>>;
  private readonly inputRef: RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      recurData: props.recurData,
      isOpen: false,
    };

    this.collection = new Map<number, Set<number>>();
    this.inputRef = createRef();
  }

  public componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    if (prevState.recurData.length !== this.state.recurData.length) {
      const days = this.state.recurData
        .map((d) => d.dayOfWeek)
        .sort()
        .map((d) => capitalize(dayOfWeekCodes[d]));
      this.setState({ inputValue: days.join(', ') });
    }
  }

  public render() {
    const target = <div className="daytime-picker__input">{this.renderInput()}</div>;

    return (
      <div className="daytime-picker">
        <EuiFormControlLayout icon="calendar" clear={{ onClick: this.onClearInput }}>
          <PopperComponent
            hidePopper={!this.state.isOpen}
            popperComponent={this.renderCalendarWeek()}
            targetComponent={target}
          />
        </EuiFormControlLayout>
      </div>
    );
  }

  private renderInput() {
    const className = classNames('euiFieldText', 'euiFieldText--withIcon', {
      [outsideClickIgnoreClass]: this.state.isOpen,
    });

    return (
      <input
        className={className}
        value={this.state.inputValue}
        onChange={() => {}}
        onFocus={() => this.onTogglePopover(true)}
        ref={this.inputRef}
      />
    );
  }

  private renderCalendarWeek() {
    return (
      <WrappedCalendarWeek
        onSelect={this.handleSelect}
        onSelectAll={this.handleSelectAll}
        recurData={this.state.recurData}
        onClickOutside={this.handleCalendarClickOutside}
        outsideClickIgnoreClass={outsideClickIgnoreClass}
      />
    );
  }

  private handleSelect = (datum: Datum) => {
    const day = parseInt(datum.day, 10);
    const hour = parseInt(datum.hour, 10);
    const hourSet = this.collection.get(day);

    if (hourSet != null) {
      if (datum.selected && !hourSet.has(hour)) hourSet.add(hour);
      else hourSet.delete(hour);
    } else {
      this.collection.set(day, new Set<number>().add(hour));
    }

    this.handleAfterSelect();
  };

  private handleSelectAll = (dayStr: string, selected: boolean) => {
    const day = parseInt(dayStr, 10);
    const hourSet = this.collection.get(day);

    if (!selected) this.collection.delete(day);

    if (hourSet != null) {
      hourOfDayList.forEach((h) => hourSet.add(h));
    } else {
      this.collection.set(
        day,
        new Set<number>([...hourOfDayList])
      );
    }

    this.handleAfterSelect();
  };

  private handleAfterSelect = () => {
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

  private onTogglePopover = (shouldOpen: boolean) => {
    this.setState({ isOpen: shouldOpen });
  };

  private onClearInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState({ recurData: [] });
  };

  private handleCalendarClickOutside = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (this.inputRef.current != null) this.inputRef.current.blur();
    this.setState({ isOpen: false });
  };
}
