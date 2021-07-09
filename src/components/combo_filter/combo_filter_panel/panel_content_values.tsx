import React, { useState } from 'react';
// @ts-ignore
import { EuiCheckboxGroup, EuiSpacer } from '@elastic/eui';

interface Props {
  subject: string;
  values: string[];
}

export function PanelContentValues(props: Props) {
  const [checkboxIdMap, setCheckboxIdMap] = useState<Record<string, boolean>>({});

  const options = props.values.map((v, i) => ({ id: `${i}-${v}`, label: v }));

  const handleCheckboxChange = (optionId: any) => {
    const newCheckboxIdMap = {
      ...checkboxIdMap,
      ...{ [optionId]: !checkboxIdMap[optionId] },
    };
    setCheckboxIdMap(newCheckboxIdMap);
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
