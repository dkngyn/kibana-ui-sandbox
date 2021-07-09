import React, { RefCallback } from 'react';
import { EuiPanel } from '@elastic/eui';

interface Props {
  refCallback: RefCallback<HTMLDivElement>;
}

export function ComboFilterPanel(props: Props) {
  return (
    <EuiPanel>
      <div className="comboFilter__panel" ref={props.refCallback}>
        <p>panel</p>
      </div>
    </EuiPanel>
  );
}
