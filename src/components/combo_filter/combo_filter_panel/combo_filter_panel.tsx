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
import { PanelContentSummary } from './panel_content_summary';

interface Props {
  name: string;
  refCallback: RefCallback<HTMLDivElement>;
  onSubmit: (filters: Record<string, string[]>) => void;
}

export function ComboFilterPanel(props: Props) {
  const [mockContent, setMockContent] = useState<Record<string, string[]>>({});
  const [query, setQuery] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [collection, setCollection] = useState<Record<string, string[]>>({});
  const [filterCount, setFilterCount] = useState<number>(0);

  useEffect(() => {
    fetchData(query)
      .then((resp) => {
        setMockContent(resp);
        const s = Object.keys(resp)[0];
        setSubject(s);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, [query]);

  useEffect(() => {
    const count = Object.values(collection).reduce((acc: number, cur: string[]) => {
      acc += cur.length;
      return acc;
    }, 0);
    setFilterCount(count);
  }, [collection]);

  const handleSubjectSelect = (subj: string) => {
    setSubject(subj);
  };

  const handleValueSelect = (subj: string, selectedValues: string[]) => {
    const newFilters = {
      ...collection,
      ...{ [subj]: selectedValues },
    };
    setCollection(newFilters);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleClick = () => {
    props.onSubmit(collection);
  };

  return (
    <EuiPanel className="comboFilter__panel" paddingSize="none">
      <EuiFlexGroup className="comboFilter__panel-body" gutterSize="none" ref={props.refCallback}>
        <EuiFlexItem className="comboFilter__content">
          <EuiFieldSearch compressed value={query} onChange={handleSearch} />
          <PanelContentSummary
            name={props.name}
            count={filterCount}
            onSelect={() => handleSubjectSelect('total')}
          />
          <PanelContentSubjects
            subjects={Object.keys(mockContent)}
            onSelect={handleSubjectSelect}
          />
        </EuiFlexItem>
        <EuiFlexItem className="comboFilter__content">
          <PanelContentValues
            subject={subject}
            content={mockContent}
            collection={collection}
            onSelect={handleValueSelect}
          />
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
            <EuiButton fill size="s" onClick={handleClick}>
              Add filters
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPanel>
  );
}
