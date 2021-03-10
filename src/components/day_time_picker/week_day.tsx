import React from 'react';
import { DayHour, hourOfDayCodes } from './day_hour';
import { RecurDoc, Datum } from './typings';

interface Props {
  day: string;
  onSelect: (datum: Datum) => void;
  recurDoc?: Readonly<RecurDoc>;
}

export const dayOfWeekCodes = {
  1: 'sun',
  2: 'mon',
  3: 'tue',
  4: 'wed',
  5: 'thu',
  6: 'fri',
  7: 'sat',
} as Record<string, string>;

export function WeekDay(props: Props) {
  const { day, onSelect, recurDoc } = props;

  const isSelected = recurDoc != null;

  const hours = Object.keys(hourOfDayCodes).map((hour, i) => {
    const midday = i < 12 ? 'day-hour--am' : 'day-hour--pm';
    const selected = recurDoc != null && recurDoc.hourOfDay.includes(parseInt(hour, 10));

    return (
      <DayHour
        key={i}
        day={day}
        hour={hour}
        midday={midday}
        selected={selected}
        onClick={onSelect}
      />
    );
  });

  const classes = ['daytime-picker__day-name'];
  if (isSelected) classes.push('day-name--selected');

  return (
    <div className="daytime-picker__day">
      <div className={classes.join(' ')}>{dayOfWeekCodes[day]}</div>
      {hours}
    </div>
  );
}
