import React, { ChangeEvent } from 'react';
// @ts-ignore
import { EuiFieldSearch, EuiContextMenuItem, EuiSpacer } from '@elastic/eui';

interface Props {
  query: string;
  subjects: string[];
  onSelect: (subj: string) => void;
  onSearch: (q: string) => void;
}

export function PanelContentSubjects(props: Props) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.onSearch(e.target.value);
  };

  const items = props.subjects.map((s, i) => (
    <EuiContextMenuItem hasPanel key={`${i}-${s}`} onClick={() => props.onSelect(s)}>
      {s}
    </EuiContextMenuItem>
  ));

  return (
    <div className="comboFilter__subjects">
      <EuiFieldSearch compressed value={props.query} onChange={handleSearchChange} />
      <EuiSpacer size="s" />
      <div className="comboFilter__subjects-list euiContextMenuPanel">{items}</div>
    </div>
  );
}
