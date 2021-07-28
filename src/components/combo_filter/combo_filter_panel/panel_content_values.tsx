import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { EuiCheckboxGroup } from '@elastic/eui';
import { pickBy, isEmpty } from 'lodash';
import { CheckboxCollection } from '../types';

interface Props {
  subject: string;
  content: CheckboxCollection;
  collection: Record<string, string[]>;
  onSelect: (s: string, vs: string[]) => void;
}

export function PanelContentValues({ subject, content, collection, onSelect }: Props) {
  const [checkboxIdMap, setCheckboxIdMap] = useState<Record<string, boolean>>({});
  const [options, setOptions] = useState<Array<Record<string, string>>>([]);
  const prevSubj = usePrevious(subject);

  useEffect(() => {
    if (prevSubj !== subject) setCheckboxIdMap({});

    if (!isEmpty(subject)) {
      setOptions(content[subject]);

      if (!isEmpty(collection[subject])) {
        const newCheckboxIdMap: Record<string, boolean> = {};
        collection[subject].forEach((s) => (newCheckboxIdMap[s] = true));
        setCheckboxIdMap(newCheckboxIdMap);
      }
    }
  }, [prevSubj, subject, content, collection]);

  const handleCheckboxChange = (optionId: any) => {
    const newCheckboxIdMap = {
      ...checkboxIdMap,
      ...{ [optionId]: !checkboxIdMap[optionId] },
    };
    setCheckboxIdMap(newCheckboxIdMap);

    const selectedValues: string[] = Object.keys(pickBy(newCheckboxIdMap, (v, k) => v === true));

    onSelect(subject, selectedValues);
  };

  return (
    <div className="comboFilter__values-wrap">
      <p className="comboFilter__values-title">{subject}</p>
      <EuiCheckboxGroup
        className="comboFilter__values-list"
        options={options}
        idToSelectedMap={checkboxIdMap}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}

function usePrevious(val: string) {
  const ref = useRef('');
  useEffect(() => {
    ref.current = val;
  }, [val]);
  return ref.current;
}
