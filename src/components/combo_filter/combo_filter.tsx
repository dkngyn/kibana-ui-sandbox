import React, { FocusEvent, useState } from 'react';
import { EuiPortal } from '@elastic/eui';
import { ComboFilterInput } from './combo_filter_input';
import { ComboFilterPanel } from './combo_filter_panel';
import { ComboFilterPortal } from './combo_filter_portal';

interface Props {
  id?: string;
  name: string;
  compressed?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export function ComboFilter(props: Props) {
  const { compressed, id, name, placeholder, fullWidth, isLoading } = props;

  const [isPanelOpen, setPanelOpen] = useState<boolean>(false);

  let refInstance: HTMLDivElement | null = null;
  const refCallback = (r: HTMLDivElement) => {
    if (refInstance) refInstance.removeEventListener('focusout', handleBlur);

    refInstance = r;
    if (refInstance) refInstance.addEventListener('focusout', handleBlur);
  };

  let panelRefInstance: HTMLDivElement | null = null;
  const panelRefCallback = (r: HTMLDivElement) => {
    panelRefInstance = r;
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setPanelOpen(true);
  };

  const handleBlur = (event: unknown) => {
    const focusEvent = event as FocusEvent & {
      explicitOriginalTarget: EventTarget;
    };

    const relatedTarget = (focusEvent.relatedTarget ||
      focusEvent.explicitOriginalTarget) as Node | null;

    const focusedInInput = relatedTarget && refInstance && refInstance.contains(relatedTarget);

    if (!focusedInInput) setPanelOpen(false);
  };

  const panel = isPanelOpen ? (
    <EuiPortal>
      <ComboFilterPanel name={name} refCallback={panelRefCallback} />
    </EuiPortal>
  ) : (
    <></>
  );

  return (
    <div className="comboFilter" ref={refCallback}>
      <ComboFilterInput
        id={id}
        compressed={compressed}
        fullWidth={fullWidth}
        isLoading={isLoading}
        placeholder={placeholder}
        onFocus={handleFocus}
      />
      <ComboFilterPortal name={name} refCallback={panelRefCallback} />
    </div>
  );
}
