import React, { MouseEvent } from 'react';
import { hourOfDayCodes } from './consts';

interface Props {
  day: string;
  hour: string;
  midday: string;
  onClick: (datum: Datum) => void;
}

export interface Datum {
  day: string;
  hour: string;
}

export function DayHour(props: Props) {
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
      {hourOfDayCodes[hour]}
    </div>
  );
}
