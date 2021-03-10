import React from 'react';
import { WeekDay, dayOfWeekCodes } from './week_day';
import { Datum, RecurDoc } from './typings';

interface Props {
  recurData: Readonly<RecurDoc[]>;
  onSelect: (d: Datum) => void;
}

export function CalendarWeek(props: Props) {
  const findRecurDoc = (dayCode: string) =>
    props.recurData.find((d) => String(d.dayOfWeek) === dayCode);

  const weekDays = Object.keys(dayOfWeekCodes).map((dayCode, i) => (
    <WeekDay key={i} day={dayCode} onSelect={props.onSelect} recurDoc={findRecurDoc(dayCode)} />
  ));

  return <div className="daytime-picker__weekdays">{weekDays}</div>;
}
