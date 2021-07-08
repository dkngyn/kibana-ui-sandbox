import React from 'react';
import { EuiPanel } from '@elastic/eui';

interface Props {
  a?: string;
}

export function ComboFilterPanel(props: Props) {
  return (
    <EuiPanel>
      <div className="comboFilter__panel">
        <p>panel</p>
      </div>
    </EuiPanel>
  );
}
