import React from 'react';
import { dayOfWeekCodes, hourOfDayCodes } from './consts';
import { DayHour, Datum } from './dayhour';

interface Props {
  day: string;
  onSelect: (datum: Datum) => void;
}

export function WeekDay(props: Props) {
  const { day, onSelect } = props;

  const hours = Object.keys(hourOfDayCodes).map((hour, i) => {
    const midday = i < 12 ? 'day-hour--am' : 'day-hour--pm';

    return <DayHour key={i} day={day} hour={hour} midday={midday} onClick={onSelect} />;
  });

  return (
    <div className="daytime-picker__day">
      <div className="daytime-picker__day-name">{dayOfWeekCodes[day]}</div>
      {hours}
    </div>
  );
}
