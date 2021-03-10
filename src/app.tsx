import React, { useState } from 'react';
import { DayTimePicker, RecurDoc } from './components/day_time_picker';

export function App() {
  const [recurData, setRecurData] = useState([] as RecurDoc[]);

  const handleSelect = (datum: RecurDoc[]) => {
    setRecurData(datum);
    // eslint-disable-next-line no-console
    console.log(datum);
  };

  return (
    <div className="euiPage">
      <div className="euiPageBody euiPageBody--paddingLarge">
        <div className="euiPageContent euiPageContent--restrictWidth">
          <DayTimePicker recurData={recurData} onSelect={handleSelect} />
        </div>
      </div>
    </div>
  );
}
