import React, { useState, RefCallback } from 'react';
import { EuiPanel, EuiFlexGroup, EuiFlexItem, EuiButton, EuiButtonEmpty } from '@elastic/eui';
import { PanelContentSubjects } from './panel_content_subjects';
import { PanelContentValues } from './panel_content_values';

interface Props {
  refCallback: RefCallback<HTMLDivElement>;
}

const mockContent: Record<string, string[]> = {
  Roles: [
    'Sys admin',
    'Server admin',
    'Database owner',
    'Database security admin',
    'Access admin',
    'Backup operator',
    'DDL admin',
    'Data writer',
    'Data operator',
    'Setup admin',
    'Bulk admin',
    'Disk admin',
  ],
  Permissions: [
    'ACCESS',
    'ALL',
    'READ',
    'MODIFY',
    'EXECUTE',
    'BACKUP',
    'DDL',
    'MAINTENANCE',
    'DELETE',
  ],
  Boolean: ['is something', 'is something else', 'is some other thing'],
  Groups: ['READ', 'MODIFY', 'EXECUTE'],
  Users: ['DDL', 'DELETE'],
  'AWS roles': ['EXECUTE', 'BACKUP', 'DDL', 'MAINTENANCE', 'DELETE'],
  Emails: ['imperva.com', 'jsonar.com'],
  'Managed by': ['ACCESS', 'ALL', 'READ'],
};

export function ComboFilterPanel(props: Props) {
  const [subject, setSubject] = useState<string>(Object.keys(mockContent)[0]);
  const [values, setValues] = useState<string[]>(mockContent[subject]);

  const handleSubjectSelect = (subj: string) => {
    setSubject(subj);
    setValues(mockContent[subj]);
  };

  return (
    <EuiPanel className="comboFilter__panel" paddingSize="none">
      <EuiFlexGroup className="comboFilter__panel-body" gutterSize="none" ref={props.refCallback}>
        <EuiFlexItem className="comboFilter__content comboFilter__content-subjects">
          <PanelContentSubjects
            subjects={Object.keys(mockContent)}
            onSelect={handleSubjectSelect}
          />
        </EuiFlexItem>
        <EuiFlexItem className="comboFilter__content comboFilter__content-values">
          <PanelContentValues subject={subject} values={values} />
        </EuiFlexItem>
      </EuiFlexGroup>
      <div className="comboFilter__panel-footer">
        <EuiFlexGroup justifyContent="spaceBetween" gutterSize="none">
          <EuiFlexItem grow={false}>
            <EuiButtonEmpty color="text" size="s" flush="left">
              Reset
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton fill size="s">
              Add filters
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPanel>
  );
}
