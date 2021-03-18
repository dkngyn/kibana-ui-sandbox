import React from 'react';
import { EuiButton, EuiButtonEmpty, EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';

export function ReportConfigure() {
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
              <EuiButton fill={true} size="s">
                Save
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiFlexGroup alignItems="center" gutterSize="s" justifyContent="flexStart">
            <EuiFlexItem grow={false}>Report name</EuiFlexItem>
            <EuiFlexItem>
              <EuiButtonIcon aria-label="edit" iconType="pencil" />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
