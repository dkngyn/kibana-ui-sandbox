import React, { useEffect, useState } from 'react';
import { EuiText } from '@elastic/eui';
import { size } from 'lodash';
import { CheckboxCollection, CheckboxIdMap } from '../types';
import { PanelContentValues } from './panel_content_values';
import { transformToCheckboxCollection } from '../utils';

interface Props {
  count: number;
  filterMap: Record<string, CheckboxIdMap>;
  onSelect: (s: string, m: CheckboxIdMap) => void;
}

export function PanelContentSelectedValues({ count, filterMap, onSelect }: Props) {
  const [options, setOptions] = useState<CheckboxCollection>({});

  useEffect(() => {
    if (count > 0) {
      setOptions(transformToCheckboxCollection(filterMap));
    }
  }, [count, filterMap]);

  if (count === 0) {
    return (
      <EuiText size="s" color="subdued">
        <p>No filters selected</p>
      </EuiText>
    );
  }

  const groups = Object.keys(options).map((s, i) => (
    <PanelContentValues
      key={i}
      subject={s}
      optionMap={options}
      filterMap={filterMap}
      onSelect={onSelect}
    />
  ));

  return <>{groups}</>;
}
