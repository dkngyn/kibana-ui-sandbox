import React from 'react';
// @ts-ignore
import { EuiFormControlLayout, EuiFormControlLayoutIconProps, CommonProps } from '@elastic/eui';

interface Props extends CommonProps {
  id?: string;
  compressed?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export function ComboFilterInput(props: Props) {
  const { isLoading, compressed, fullWidth, placeholder } = props;

  const icon: EuiFormControlLayoutIconProps['icon'] = { side: 'right', type: 'arrowDown' };

  const placeholderMessage =
    placeholder != null ? <p className="comboFilter__placeholder">{placeholder}</p> : <></>;

  return (
    <EuiFormControlLayout
      icon={icon}
      compressed={compressed}
      fullWidth={fullWidth}
      isLoading={isLoading}
    >
      <div className="comboFilter__inputWrap">
        {placeholderMessage}
        <div className="comboFilter__input">
          <input className="" />
        </div>
      </div>
    </EuiFormControlLayout>
  );
}
