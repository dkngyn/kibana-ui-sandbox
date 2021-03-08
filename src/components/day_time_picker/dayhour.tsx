import React, { MouseEvent } from 'react';
import { hourOfDayCodes } from './consts';

interface Props {
  day: string;
  hour: string;
  midday: string;
  onClick: (datum: Datum) => void;
}

export interface Datum {
  day: number;
  hour: number;
}

export function DayHour(props: Props) {
  const { day, hour, midday } = props;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    props.onClick({ day: parseInt(day, 10), hour: parseInt(hour, 10) });
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
