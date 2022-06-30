import React, { MouseEvent } from 'react';
import { EuiButton, EuiBadge } from '@elastic/eui';

interface Props {
  name: string;
  filterCount: number;
  onClick: (e: MouseEvent<HTMLElement>) => void;
}

export function ComboFilterInput(props: Props) {
  const { name, filterCount, onClick } = props;

  const badge = <EuiBadge>{filterCount}</EuiBadge>;
  const label =
    filterCount !== 0 ? (
      <>
        {name} {badge}
      </>
    ) : (
      <>{name}</>
    );

  return (
    <EuiButton
      className="comboFilter__input"
      color="text"
      iconSide="right"
      iconType="arrowDown"
      onClick={onClick}
    >
      {label}
    </EuiButton>
  );
}
