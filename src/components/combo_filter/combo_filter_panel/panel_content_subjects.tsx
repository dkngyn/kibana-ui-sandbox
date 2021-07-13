import React from 'react';
import { EuiBadge, EuiListGroup, EuiListGroupItem } from '@elastic/eui';

interface Props {
  name: string;
  subjects: string[];
  onSelect: (subj: string) => void;
}

export function PanelContentSubjects(props: Props) {
  const items = props.subjects.map((s, i) => (
    <EuiListGroupItem
      wrapText
      size="s"
      label={s}
      key={`${i}-${s}`}
      onClick={() => props.onSelect(s)}
    />
  ));

  return (
    <div className="comboFilter__subjects">
      {renderTotal(props.name, 2)}
      <div className="comboFilter__subjects-list">
        <EuiListGroup>{items}</EuiListGroup>
      </div>
    </div>
  );
}

function renderTotal(name: string, count: number) {
  const badge = <EuiBadge>{count}</EuiBadge>;
  const label = (
    <strong>
      Selected {name.toLowerCase()} filter {badge}
    </strong>
  );

  const handleClick = () => {};

  return (
    <div className="comboFilter__subjects-total">
      <EuiListGroup>
        <EuiListGroupItem wrapText size="s" label={label} onClick={handleClick} />
      </EuiListGroup>
    </div>
  );
}
