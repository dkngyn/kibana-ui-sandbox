import React, { useState } from 'react';
// @ts-ignore
import { EuiFlyoutBody, EuiFlyoutHeader, EuiTitle } from '@elastic/eui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export function ReportSettings(props: Props) {
  return (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h1>Report settings</h1>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>...</EuiFlyoutBody>
    </>
  );
}
