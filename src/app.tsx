import React from 'react';

import { ReportConfigure } from './components/report_configure';

export function App() {
  return (
    <div className="euiPage">
      <div className="euiPageBody euiPageBody--paddingLarge">
        <div className="euiPageContent euiPageContent--restrictWidth">
          <ReportConfigure />
        </div>
      </div>
    </div>
  );
}
