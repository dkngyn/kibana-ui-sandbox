import React, { MouseEvent } from 'react';
import { hourOfDayCodes } from './consts';

interface Props {
  day: string;
  onSelect: (datum: Datum) => void;
}

export interface Datum {
  day: string;
  hour: string;
}

export function WeekDay(props: Props) {
  const handleClick = (datum: Datum) => {
    props.onSelect(datum);
  };

  const hours = Object.keys(hourOfDayCodes).map((hour, i) => {
    const midday = i < 12 ? 'midday--am' : 'midday--pm';
    return <DayHour key={i} day={props.day} hour={hour} midday={midday} onClick={handleClick} />;
  });

  return (
    <div className="daytime-picker__day">
      <div className="daytime-picker__day-name">{props.day}</div>
      {hours}
    </div>
  );
}

interface Props2 {
  day: string;
  hour: string;
  midday: string;
  onClick: (datum: Datum) => void;
}

function DayHour(props: Props2) {
  const { day, hour, midday } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    props.onClick({ day, hour });
  };

  return (
    <div
      className={`daytime-picker__day-hour ${midday}`}
      onClick={handleClick}
      onKeyPress={() => {}}
    >
      {hourOfDayCodes[parseInt(hour, 10)]}
    </div>
  );
}
