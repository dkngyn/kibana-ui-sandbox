/*
 * See SONAR_EULA file in the project root for full license information.
 */

import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import { DayHour, hourOfDayCodes } from './day_hour';
import { RecurDoc, Datum } from './typings';

interface Props {
  day: string;
  onSelect: (datum: Datum) => void;
  onSelectAll: (day: string) => void;
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
  const { day, onSelect, onSelectAll, recurDoc } = props;

  const isSelected = recurDoc != null;

  const hours = Object.keys(hourOfDayCodes).map((hour, i) => {
    const hourInt = parseInt(hour, 10);
    const midday = hourInt < 12 ? 'day-hour--am' : 'day-hour--pm';
    const selected = recurDoc != null && recurDoc.hourOfDay.includes(hourInt);

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

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log({ recurDoc });
    onSelectAll(day);
  };

  const className = classNames('daytime-picker__day-name', { 'day-name--selected': isSelected });

  return (
    <div className="daytime-picker__day">
      <div className={className} onClick={onClick} onKeyPress={() => {}}>
        {dayOfWeekCodes[day]}
      </div>
      {hours}
    </div>
  );
}
