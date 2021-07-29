import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { EuiCheckboxGroup } from '@elastic/eui';
import { isEmpty } from 'lodash';
import { CheckboxCollection, CheckboxIdMap } from '../types';

interface Props {
  subject: string;
  optionMap: CheckboxCollection;
  filterMap: Record<string, CheckboxIdMap>;
  onSelect: (s: string, m: CheckboxIdMap) => void;
}

export function PanelContentValues({ subject, optionMap, filterMap, onSelect }: Props) {
  const [checkboxIdMap, setCheckboxIdMap] = useState<CheckboxIdMap>({});
  const [options, setOptions] = useState<Array<Record<string, string>>>([]);
  const prevSubj = usePrevious(subject);

  useEffect(() => {
    if (prevSubj !== subject) setCheckboxIdMap({});

    if (!isEmpty(subject)) {
      setOptions(optionMap[subject]);

      if (!isEmpty(filterMap[subject])) {
        setCheckboxIdMap(filterMap[subject]);
      }
    }
  }, [prevSubj, subject, optionMap, filterMap]);

  const handleCheckboxChange = (optionId: any) => {
    const newCheckboxIdMap = {
      ...checkboxIdMap,
      ...{ [optionId]: !checkboxIdMap[optionId] },
    };
    setCheckboxIdMap(newCheckboxIdMap);

    onSelect(subject, newCheckboxIdMap);
  };

  return (
    <>
      <p className="comboFilter__values-title">{subject}</p>
      <EuiCheckboxGroup
        className="comboFilter__values-list"
        options={options}
        idToSelectedMap={checkboxIdMap}
        onChange={handleCheckboxChange}
      />
    </>
  );
}

function usePrevious(val: string) {
  const ref = useRef('');
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref.current;
}
