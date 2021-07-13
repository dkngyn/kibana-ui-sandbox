import React, { RefCallback } from 'react';
import { EuiPortal } from '@elastic/eui';
import { ComboFilterPanel } from '../combo_filter_panel';

interface Props {
  name: string;
  refCallback: RefCallback<HTMLDivElement>;
}

export function ComboFilterPortal(props: Props) {
  return (
    <EuiPortal key="comboFilter__portal">
      <ComboFilterPanel {...props} />
    </EuiPortal>
  );
}
