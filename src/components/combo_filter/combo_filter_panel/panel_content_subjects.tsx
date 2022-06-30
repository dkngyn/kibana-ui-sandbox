import React from 'react';
import { EuiBadge, EuiListGroup, EuiListGroupItem } from '@elastic/eui';

interface Props {
  subjects: string[];
  onSelect: (subj: string) => void;
}

export function PanelContentSubjects({ subjects, onSelect }: Props) {
  const items = subjects.map((s, i) => (
    <EuiListGroupItem wrapText size="s" label={s} key={`${i}-${s}`} onClick={() => onSelect(s)} />
  ));

  return (
    <div className="comboFilter__subjects">
      <div className="comboFilter__subjects-list">
        <EuiListGroup>{items}</EuiListGroup>
      </div>
    </div>
  );
}
