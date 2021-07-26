import React, { RefCallback } from 'react';
import { EuiPortal } from '@elastic/eui';
import { ComboFilterPanel } from '../combo_filter_panel';

interface Props {
  name: string;
  refCallback: RefCallback<HTMLDivElement>;
  onSubmit: (filters: Record<string, string[]>) => void;
}

export function ComboFilterPortal(props: Props) {
  return (
    <EuiPortal key="comboFilter__portal">
      <ComboFilterPanel {...props} />
    </EuiPortal>
  );
}
