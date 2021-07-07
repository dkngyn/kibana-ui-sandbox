import React, { ChangeEvent, useState } from 'react';
import { ComboFilterInput } from './combo_filter_input';

interface Props {
  id?: string;
  compressed?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export function ComboFilter(props: Props) {
  const { compressed, id, placeholder, fullWidth, isLoading } = props;

  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="comboFilter">
      <ComboFilterInput
        id={id}
        compressed={compressed}
        fullWidth={fullWidth}
        isLoading={isLoading}
        placeholder={placeholder}
      />
    </div>
  );
}
