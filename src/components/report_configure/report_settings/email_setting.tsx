import React, { useState } from 'react';
import {
  // @ts-ignore
  EuiFieldText,
  // @ts-ignore
  EuiFormRow,
  EuiSpacer,
  EuiText,
  // @ts-ignore
  EuiSwitch,
  // @ts-ignore
  EuiSelect,
  EuiRadioGroup,
  EuiRadioGroupOption,
} from '@elastic/eui';

const notificationTypes: EuiRadioGroupOption[] = [
  {
    id: 'emailNotificationType_link',
    label: 'Contains link to the report results',
  },
  {
    id: 'emailNotificationType_attachment',
    label: 'Contains attachment of the report results',
  },
];

export function EmailSetting() {
  const [isEmailEnabled, setEmailEnabled] = useState(true);
  const [selectedNotificationType, setSelectedNotificationType] = useState(notificationTypes[0].id);

  const emailDetails = isEmailEnabled ? (
    <>
      <EuiFormRow label="Input label" helpText="Help text to guide users">
        <EuiSelect options={[]} onChange={() => {}} />
      </EuiFormRow>
      <EuiFormRow label="Email template">
        <EuiSelect options={[]} onChange={() => {}} />
      </EuiFormRow>
      <EuiFormRow label="Header & body">
        <EuiFieldText name="emailHeaderBody" />
      </EuiFormRow>
      <EuiFormRow label="Footer">
        <EuiFieldText name="emailFooter" />
      </EuiFormRow>
      <EuiFormRow label="Subject">
        <EuiFieldText name="emailSubject" />
      </EuiFormRow>
      <EuiFormRow label="Recipients">
        <EuiFieldText name="emailRecipients" />
      </EuiFormRow>
      <EuiFormRow label="Notification type">
        <EuiRadioGroup
          idSelected={selectedNotificationType}
          options={notificationTypes}
          onChange={setSelectedNotificationType}
        />
      </EuiFormRow>
    </>
  ) : (
    <></>
  );
  return (
    <>
      <EuiText size="s">
        <h3>Send report by email</h3>
      </EuiText>
      <EuiText size="xs">
        <p>
          Some explanation text. <a href="#learn_more">Learn more</a>
        </p>
      </EuiText>
      <EuiSpacer size="s" />
      <EuiFormRow>
        <EuiSwitch
          label="Send report by email"
          checked={isEmailEnabled}
          onChange={() => setEmailEnabled(!isEmailEnabled)}
        />
      </EuiFormRow>
      {emailDetails}
    </>
  );
}
