import React, { useState } from 'react';
import { dayOfWeekCodes, hourOfDayCodes } from './consts';
import { DayHour, Datum } from './dayhour';
import { RecurData } from './day_time_picker';

interface Props {
  day: string;
  onSelect: (datum: Datum) => void;
  recurData?: Readonly<RecurData>;
}

export function WeekDay(props: Props) {
  const { day, onSelect, recurData } = props;

  const isSelected = recurData != null;

  const hours = Object.keys(hourOfDayCodes).map((hour, i) => {
    const midday = i < 12 ? 'day-hour--am' : 'day-hour--pm';
    const selected = recurData != null && recurData.hourOfDay.includes(parseInt(hour, 10));

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
