import React from 'react';
import { EuiBadge, EuiListGroup, EuiListGroupItem } from '@elastic/eui';

interface Props {
  name: string;
  count: number;
  onSelect: () => void;
}

export function PanelContentSummary({ name, count, onSelect }: Props) {
  const badge = <EuiBadge>{count}</EuiBadge>;

  const label = (
    <strong>
      Selected {name.toLowerCase()} filter {badge}
    </strong>
  );

  return (
    <div className="comboFilter__summary">
      <EuiListGroup>
        <EuiListGroupItem wrapText size="s" label={label} onClick={onSelect} />
      </EuiListGroup>
    </div>
  );
}
