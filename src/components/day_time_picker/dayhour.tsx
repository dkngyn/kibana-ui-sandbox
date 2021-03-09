import React, { MouseEvent, useState } from 'react';
import { hourOfDayCodes } from './consts';

interface Props {
  day: string;
  hour: string;
  midday: string;
  selected: boolean;
  onClick: (datum: Datum) => void;
}

export interface Datum {
  day: string;
  hour: string;
  selected: boolean;
}

export function DayHour(props: Props) {
  const { day, hour, midday, selected, onClick } = props;

  const [isSelected, setSelected] = useState(selected);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSelected(!isSelected);
    onClick({ day, hour, selected: !isSelected });
  };

  const classes = ['daytime-picker__day-hour', midday];
  if (isSelected) classes.push('day-hour--selected');

  return (
    <div className={classes.join(' ')} onClick={handleClick} onKeyPress={() => {}}>
      {hourOfDayCodes[hour]}
    </div>
  );
}
