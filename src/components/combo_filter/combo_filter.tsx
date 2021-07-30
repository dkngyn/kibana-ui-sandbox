import React, { FocusEvent, MouseEvent, useState } from 'react';
import { EuiFormControlLayout } from '@elastic/eui';
import onClickOutside from 'react-onclickoutside';
import { ComboFilterInput } from './combo_filter_input';
import { ComboFilterPortal } from './combo_filter_portal';
import { PopperComponent } from './popper_component';

interface Props {
  id?: string;
  name: string;
  compressed?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const outsideClickIgnoreClass = 'comboFilter--ignore-onClickOutside';
const ComboFilterPanelPortal = onClickOutside(ComboFilterPortal);

export function ComboFilter(props: Props) {
  const { compressed, name, fullWidth, isLoading } = props;

  const [isPanelOpen, setPanelOpen] = useState<boolean>(false);
  const [filterCount, setFilterCount] = useState<number>(0);

  const handleClickInside = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setPanelOpen(true);
  };

  const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setPanelOpen(false);
  };

  const handleSubmit = (filters: Record<string, string[]>) => {
    const count = Object.values(filters).reduce((total, cur) => {
      total += cur.length;
      return total;
    }, 0);
    setFilterCount(count);
  };

  const input = (
    <ComboFilterInput name={name} filterCount={filterCount} onClick={handleClickInside} />
  );

  const panel = (
    <ComboFilterPanelPortal
      name={name}
      onSubmit={handleSubmit}
      onClickOutside={handleClickOutside}
      outsideClickIgnoreClass={outsideClickIgnoreClass}
    />
  );

  return (
    <div className="comboFilter">
      <EuiFormControlLayout compressed={compressed} fullWidth={fullWidth} isLoading={isLoading}>
        <PopperComponent
          hidePopper={!isPanelOpen}
          popperComponent={panel}
          targetComponent={input}
        />
      </EuiFormControlLayout>
    </div>
  );
}
