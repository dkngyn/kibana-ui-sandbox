import React, { useEffect, useState, RefCallback, ChangeEvent } from 'react';
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
  // @ts-ignore
  EuiFieldSearch,
} from '@elastic/eui';
import { PanelContentSubjects } from './panel_content_subjects';
import { PanelContentValues } from './panel_content_values';
import { fetchData } from '../fetch_data';

interface Props {
  name: string;
  refCallback: RefCallback<HTMLDivElement>;
}

export function ComboFilterPanel(props: Props) {
  const [mockContent, setMockContent] = useState<Record<string, string[]>>({});
  const [query, setQuery] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    fetchData(query)
      .then((resp) => {
        setMockContent(resp);
        const s = Object.keys(resp)[0];
        return { s, v: resp[s] };
      })
      .then(({ s, v }) => {
        setSubject(s);
        setValues(v);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, [query]);

  const handleSubjectSelect = (subj: string) => {
    setSubject(subj);
    setValues(mockContent[subj]);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <EuiPanel className="comboFilter__panel" paddingSize="none">
      <EuiFlexGroup className="comboFilter__panel-body" gutterSize="none" ref={props.refCallback}>
        <EuiFlexItem className="comboFilter__content">
          <EuiFieldSearch compressed value={query} onChange={handleSearch} />
          <PanelContentSubjects
            name={props.name}
            subjects={Object.keys(mockContent)}
            onSelect={handleSubjectSelect}
          />
        </EuiFlexItem>
        <EuiFlexItem className="comboFilter__content">
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
