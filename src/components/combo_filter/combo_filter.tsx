import React, { ChangeEvent, useState } from 'react';
// @ts-ignore
import { EuiFieldText } from '@elastic/eui';

interface Props {
  id?: string;
  placeholder?: string;
}

export function ComboFilter({ id, placeholder }: Props) {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return <EuiFieldText placeholder={placeholder} value={value} onChange={onChange} />;
}
