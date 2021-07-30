import React, { FocusEvent } from 'react';
import { EuiButton, EuiFormControlLayout, EuiBadge, CommonProps } from '@elastic/eui';

interface Props extends CommonProps {
  name: string;
  filterCount: number;
  compressed?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
}

export function ComboFilterInput(props: Props) {
  const { name, filterCount, isLoading, compressed, fullWidth } = props;

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    props.onFocus(event);
  };

  const badge = <EuiBadge>{filterCount}</EuiBadge>;
  const label =
    filterCount !== 0 ? (
      <>
        {name} {badge}
      </>
    ) : (
      <>name</>
    );

  return (
    <EuiFormControlLayout compressed={compressed} fullWidth={fullWidth} isLoading={isLoading}>
      <EuiButton color="text" iconSide="right" iconType="arrowDown">
        {label}
      </EuiButton>
    </EuiFormControlLayout>
  );
}
