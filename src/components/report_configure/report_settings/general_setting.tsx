import React from 'react';
// @ts-ignore
import { EuiFormRow, EuiFieldText, EuiText, EuiSpacer, EuiComboBox } from '@elastic/eui';

export function GeneralSetting() {
  const title = <h4>General settings</h4>;

  return (
    <>
      <EuiText size="s">
        <h3>General settings</h3>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiFormRow label="Report name">
        <EuiFieldText name="name" />
      </EuiFormRow>
      <EuiFormRow label="Report type">
        <EuiComboBox
          placeholder="Select or create a type"
          options={[]}
          selectedOptions={[]}
          onChange={() => {}}
          onCreateOption={() => {}}
          isClearable
        />
      </EuiFormRow>
      <EuiFormRow label="Data collection">
        <EuiComboBox
          placeholder="Select a data collection"
          options={[]}
          selectedOptions={[]}
          onChange={() => {}}
          singleSelection
          isClearable
        />
      </EuiFormRow>
    </>
  );
}
