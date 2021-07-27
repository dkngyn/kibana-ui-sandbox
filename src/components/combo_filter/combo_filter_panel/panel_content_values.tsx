import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { EuiCheckboxGroup } from '@elastic/eui';
import { get, pickBy, isEmpty } from 'lodash';

interface Props {
  subject: string;
  content: Record<string, string[]>;
  onSelect: (s: string, vs: string[]) => void;
}

export function PanelContentValues({ subject, content, onSelect }: Props) {
  const [checkboxIdMap, setCheckboxIdMap] = useState<Record<string, boolean>>({});
  const [options, setOptions] = useState<Array<Record<string, string>>>([]);
  const prevSubj = usePrevious(subject);

  useEffect(() => {
    if (prevSubj !== subject) setCheckboxIdMap({});

    const opts = !isEmpty(subject)
      ? content[subject].map((v, i) => ({ id: `${i}-${v}`, label: v }))
      : [{ id: '', label: '' }];
    setOptions(opts);
  }, [prevSubj, subject, content]);

  const handleCheckboxChange = (optionId: any) => {
    const newCheckboxIdMap = {
      ...checkboxIdMap,
      ...{ [optionId]: !checkboxIdMap[optionId] },
    };
    setCheckboxIdMap(newCheckboxIdMap);

    const selectedValues: string[] = Object.keys(
      pickBy(newCheckboxIdMap, (v, k) => v === true)
    ).map(
      (k) =>
        get(
          options.find((i) => i.id === k),
          'label'
        ) as string
    );

    onSelect(subject, selectedValues);
  };

  return (
    <div className="comboFilter__values">
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
