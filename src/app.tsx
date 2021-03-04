import React from 'react';
import { DayTimePicker } from './components/day_time_picker';

export function App() {
  return (
    <div className="euiPage">
      <div className="euiPageBody euiPageBody--paddingLarge">
        <div className="euiPageContent euiPageContent--restrictWidth">
          <DayTimePicker/>
        </div>
      </div>
    </div>
  );
}
