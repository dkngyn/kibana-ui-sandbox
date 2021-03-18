import React, { useState } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  // @ts-ignore
  EuiFlyout,
} from '@elastic/eui';
import { ReportSettings } from './report_settings';

export function ReportConfigure() {
  const [isSettingFlyoutVisible, setSettingFlyoutVisible] = useState(false);

  const settingsFlyout = isSettingFlyoutVisible ? (
    <EuiFlyout onClose={() => setSettingFlyoutVisible(false)}>
      <ReportSettings />
    </EuiFlyout>
  ) : (
    <></>
  );

  return (
    <div className="reportConfigure__container">
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            href="#managment"
            size="s"
            className="reportConfigure__back"
            iconType="sortLeft"
          >
            Back
          </EuiButtonEmpty>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFlexGroup
            className="reportConfigure__buttons"
            responsive={false}
            gutterSize="s"
            alignItems="flexEnd"
            justifyContent="flexEnd"
          >
            <EuiFlexItem grow={false}>
              <EuiButton size="s">Schedule</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton size="s">Run now</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton disabled size="s">
                Cancel
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton fill={true} size="s" onClick={() => setSettingFlyoutVisible(true)}>
                Save
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      {settingsFlyout}
    </div>
  );
}
