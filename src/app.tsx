import React, { useState } from 'react';
import { ComboFilter } from './components/combo_filter';

export function App() {
  return (
    <div className="euiPage">
      <div className="euiPageBody euiPageBody--paddingLarge">
        <div className="euiPageContent euiPageContent--restrictWidth">
          <ComboFilter placeholder="Select filter options" />
        </div>
      </div>
    </div>
  );
}
