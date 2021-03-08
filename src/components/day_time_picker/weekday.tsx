import React from 'react';
import { hourOfDayCodes } from './consts';

interface Props {
  day: string;
}

export function WeekDay(props: Props) {
  const hours = Object.values(hourOfDayCodes).map((hour, i) => {
    const midday = i < 12 ? 'midday--am' : 'midday--pm';
    return (
      <div key={i} className={`daytime-picker__day-hour ${midday}`}>
        {hour}
      </div>
    );
  });

  return (
    <div className="daytime-picker__day">
      <div className="daytime-picker__day-name">{props.day}</div>
      {hours}
    </div>
  );
}
