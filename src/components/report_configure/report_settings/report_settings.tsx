import React from 'react';
import {
  // @ts-ignore
  EuiFlyoutBody,
  // @ts-ignore
  EuiFlyoutHeader,
  EuiTitle,
  // @ts-ignore
  EuiForm,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
} from '@elastic/eui';
import { GeneralSetting } from './general_setting';
import { EmailSetting } from './email_setting';

interface Props {
  onSave: () => void;
  onCancel: () => void;
}

export function ReportSettings(props: Props) {
  return (
    <>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="s">
          <h1>Report settings</h1>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm>
          <GeneralSetting />
          <EuiSpacer size="l" />
          <EmailSetting />
          <EuiSpacer size="xl" />
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton fill size="s" onClick={props.onSave}>
                Save
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty size="s" onClick={props.onCancel}>
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiForm>
      </EuiFlyoutBody>
    </>
  );
}
