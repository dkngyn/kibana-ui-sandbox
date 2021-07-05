/*
 * See SONAR_EULA file in the project root for full license information.
 */

import React, { MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { Datum } from './typings';

interface Props {
  day: string;
  hour: string;
  midday: string;
  selected: boolean;
  onClick: (datum: Datum) => void;
}

export const hourOfDayCodes = {
  0: '12',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
  13: '1',
  14: '2',
  15: '3',
  16: '4',
  17: '5',
  18: '6',
  19: '7',
  20: '8',
  21: '9',
  22: '10',
  23: '11',
} as Record<string, string>;

export function DayHour(props: Props) {
  const { day, hour, midday, selected, onClick } = props;

  const [isSelected, setSelected] = useState(selected);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSelected(!isSelected);
    onClick({ day, hour, selected: !isSelected });
  };

  const className = classNames('daytime-picker__day-hour', midday, {
    'day-hour--selected': selected,
  });

  return (
    <div className={className} onClick={handleClick} onKeyPress={() => {}}>
      {hourOfDayCodes[hour]}
    </div>
  );
}
