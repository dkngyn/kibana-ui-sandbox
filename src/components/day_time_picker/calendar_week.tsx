/*
 * See SONAR_EULA file in the project root for full license information.
 */

import React, { PureComponent, MouseEvent } from 'react';
import { WeekDay, dayOfWeekCodes } from './week_day';
import { Datum, RecurDoc } from './typings';

interface Props {
  recurData: Readonly<RecurDoc[]>;
  onSelect: (d: Datum) => void;
  onSelectAll: (wk: string, s: boolean) => void;
  onClickOutside: (e: MouseEvent<HTMLElement>) => void;
}

export class CalendarWeek extends PureComponent<Props> {
  public render() {
    const weekDays = Object.keys(dayOfWeekCodes).map((day, i) => (
      <WeekDay
        key={i}
        day={day}
        onSelect={this.props.onSelect}
        onSelectAll={this.props.onSelectAll}
        recurDoc={this.findRecurDoc(day)}
      />
    ));

    return <div className="daytime-picker__week">{weekDays}</div>;
  }

  // @ts-ignore needed for react-popper handler
  private handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    this.props.onClickOutside(e);
  };

  private findRecurDoc = (dayOfWeek: string) =>
    this.props.recurData.find((d) => String(d.dayOfWeek) === dayOfWeek);
}
