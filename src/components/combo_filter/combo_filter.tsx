import React, { FocusEvent, useState } from 'react';
import { EuiPortal } from '@elastic/eui';
import { ComboFilterInput } from './combo_filter_input';
import { ComboFilterPanel } from './combo_filter_panel';

interface Props {
  id?: string;
  compressed?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export function ComboFilter(props: Props) {
  const { compressed, id, placeholder, fullWidth, isLoading } = props;

  const [isPanelOpen, setPanelOpen] = useState<boolean>(false);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    console.log(event);
    setPanelOpen(true);
  };

  const panel = isPanelOpen ? (
    <EuiPortal>
      <ComboFilterPanel />
    </EuiPortal>
  ) : (
    <></>
  );

  return (
    <div className="comboFilter">
      <ComboFilterInput
        id={id}
        compressed={compressed}
        fullWidth={fullWidth}
        isLoading={isLoading}
        placeholder={placeholder}
        onFocus={handleFocus}
      />
      {panel}
    </div>
  );
}
