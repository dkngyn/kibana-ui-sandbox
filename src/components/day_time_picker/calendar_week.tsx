import React, { PureComponent, MouseEvent } from 'react';
import { WeekDay, dayOfWeekCodes } from './week_day';
import { Datum, RecurDoc } from './typings';

interface Props {
  recurData: Readonly<RecurDoc[]>;
  onSelect: (d: Datum) => void;
  onClickOutside: (e: MouseEvent<HTMLElement>) => void;
}

export class CalendarWeek extends PureComponent<Props> {
  public render() {
    const weekDays = Object.keys(dayOfWeekCodes).map((dayCode, i) => (
      <WeekDay
        key={i}
        day={dayCode}
        onSelect={this.props.onSelect}
        recurDoc={this.findRecurDoc(dayCode)}
      />
    ));

    return <div className="daytime-picker__week">{weekDays}</div>;
  }

  private findRecurDoc = (dayCode: string) =>
    this.props.recurData.find((d) => String(d.dayOfWeek) === dayCode);

  private handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    this.props.onClickOutside(e);
  };
}
