import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { EuiCheckboxGroup } from '@elastic/eui';
import { get, pickBy } from 'lodash';

interface Props {
  subject: string;
  values: string[];
  onSelect: (s: string, vs: string[]) => void;
}

export function PanelContentValues(props: Props) {
  const [checkboxIdMap, setCheckboxIdMap] = useState<Record<string, boolean>>({});
  const prevSubj = usePrevious(props.subject);

  const options = props.values.map((v, i) => ({ id: `${i}-${v}`, label: v }));

  useEffect(() => {
    if (prevSubj !== props.subject) setCheckboxIdMap({});
  }, [prevSubj, props.subject]);

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

    props.onSelect(props.subject, selectedValues);
  };

  return (
    <div className="comboFilter__values">
      <p className="comboFilter__values-title">{props.subject}</p>
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
