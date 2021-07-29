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
import { fetchData } from '../fetch_data';
import { CheckboxCollection, CheckboxIdMap } from '../types';
import { buildCheckboxOptions, reduceToSelectedCheckboxOptions } from '../utils';
import { PanelContentSubjects } from './panel_content_subjects';
import { PanelContentValues } from './panel_content_values';
import { PanelContentSummary } from './panel_content_summary';
import { PanelContentSelectedValues } from './panel_content_selected_values';

interface Props {
  name: string;
  refCallback: RefCallback<HTMLDivElement>;
  onSubmit: (filters: Record<string, string[]>) => void;
}

const VIEW_SUMMARY = 'react_view_summary';

export function ComboFilterPanel(props: Props) {
  const [query, setQuery] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [filterCount, setFilterCount] = useState<number>(0);
  const [filterCollection, setFilterCollection] = useState<Record<string, CheckboxIdMap>>({});
  const [checkboxCollection, setCheckboxCollection] = useState<CheckboxCollection>({});

  useEffect(() => {
    fetchData(query)
      .then((resp) => {
        setSubject(Object.keys(resp)[0]);
        setCheckboxCollection(buildCheckboxOptions(resp));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, [query]);

  useEffect(() => {
    const count = Object.values(filterCollection).reduce((acc: number, map) => {
      acc += Object.keys(reduceToSelectedCheckboxOptions(map)).length;
      return acc;
    }, 0);
    setFilterCount(count);
  }, [filterCollection]);

  const handleSubjectSelect = (subj: string) => {
    setSubject(subj);
  };

  const handleValueSelect = (subj: string, checkboxIdMap: CheckboxIdMap) => {
    const newFilters = {
      ...filterCollection,
      ...{ [subj]: checkboxIdMap },
    };
    setFilterCollection(newFilters);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSummarySelect = () => {
    setSubject(VIEW_SUMMARY);
  };

  const handleClick = () => {
    if (filterCount === 0) props.onSubmit({});

    const filters = Object.keys(filterCollection).reduce((acc, s) => {
      const reducedMap = reduceToSelectedCheckboxOptions(filterCollection[s]);
      acc[s] = Object.keys(reducedMap);
      return acc;
    }, {} as Record<string, string[]>);

    props.onSubmit(filters);
  };

  const panelContentValues =
    subject === VIEW_SUMMARY ? (
      <PanelContentSelectedValues
        count={filterCount}
        filterMap={filterCollection}
        onSelect={handleValueSelect}
      />
    ) : (
      <PanelContentValues
        subject={subject}
        optionMap={checkboxCollection}
        filterMap={filterCollection}
        onSelect={handleValueSelect}
      />
    );

  return (
    <EuiPanel className="comboFilter__panel" paddingSize="none">
      <EuiFlexGroup className="comboFilter__panel-body" gutterSize="none" ref={props.refCallback}>
        <EuiFlexItem className="comboFilter__content">
          <EuiFieldSearch compressed value={query} onChange={handleSearch} />
          <PanelContentSummary
            name={props.name}
            count={filterCount}
            onSelect={handleSummarySelect}
          />
          <PanelContentSubjects
            subjects={Object.keys(checkboxCollection)}
            onSelect={handleSubjectSelect}
          />
        </EuiFlexItem>
        <EuiFlexItem className="comboFilter__content">
          <div className="comboFilter__values">
            <div className="comboFilter__values-wrap">{panelContentValues}</div>
          </div>
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
