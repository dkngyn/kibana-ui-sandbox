import React from 'react';
import { EuiBadge, EuiListGroup, EuiListGroupItem } from '@elastic/eui';

interface Props {
  name: string;
  subjects: string[];
  filterCount: number;
  onSelect: (subj: string) => void;
}

export function PanelContentSubjects({ name, subjects, filterCount, onSelect }: Props) {
  const items = subjects.map((s, i) => (
    <EuiListGroupItem wrapText size="s" label={s} key={`${i}-${s}`} onClick={() => onSelect(s)} />
  ));

  return (
    <div className="comboFilter__subjects">
      {renderTotal(name, filterCount, onSelect)}
      <div className="comboFilter__subjects-list">
        <EuiListGroup>{items}</EuiListGroup>
      </div>
    </div>
  );
}

function renderTotal(name: string, count: number, onSelect: (s: string) => void) {
  const badge = <EuiBadge>{count}</EuiBadge>;
  const label = (
    <strong>
      Selected {name.toLowerCase()} filter {badge}
    </strong>
  );

  const handleClick = () => {
    onSelect('total');
  };

  return (
    <div className="comboFilter__subjects-total">
      <EuiListGroup>
        <EuiListGroupItem wrapText size="s" label={label} onClick={handleClick} />
      </EuiListGroup>
    </div>
  );
}
