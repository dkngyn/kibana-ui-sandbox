import React, { FocusEvent } from 'react';
import {
  EuiButton,
  EuiFormControlLayout,
  // @ts-ignore
  EuiFormControlLayoutIconProps,
  CommonProps,
} from '@elastic/eui';

interface Props extends CommonProps {
  name: string;
  compressed?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  onFocus: (e: FocusEvent<HTMLInputElement>) => void;
}

export function ComboFilterInput(props: Props) {
  const { name, isLoading, compressed, fullWidth } = props;

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    props.onFocus(event);
  };

  return (
    <EuiFormControlLayout compressed={compressed} fullWidth={fullWidth} isLoading={isLoading}>
      <EuiButton color="text" iconSide="right" iconType="arrowDown">
        {name}
      </EuiButton>
    </EuiFormControlLayout>
  );
}
