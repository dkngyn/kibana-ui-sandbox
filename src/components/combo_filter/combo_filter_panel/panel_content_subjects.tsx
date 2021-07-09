import React, { ChangeEvent, useState } from 'react';
// @ts-ignore
import { EuiFieldSearch, EuiContextMenuPanel, EuiContextMenuItem, EuiSpacer } from '@elastic/eui';

interface Props {
  subjects: string[];
  onSelect: (subj: string) => void;
}

export function PanelContentSubjects(props: Props) {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const items = props.subjects.map((subj, i) => (
    <EuiContextMenuItem hasPanel key={i} onClick={() => props.onSelect(subj)}>
      {subj}
    </EuiContextMenuItem>
  ));

  return (
    <div className="comboFilter__subjects">
      <EuiFieldSearch compressed value={query} onChange={handleSearchChange} />
      <EuiSpacer size="s" />
      <EuiContextMenuPanel className="comboFilter__subjects-list" items={items} />
    </div>
  );
}
