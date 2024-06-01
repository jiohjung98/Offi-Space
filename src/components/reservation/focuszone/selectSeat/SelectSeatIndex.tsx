import React from 'react';
import SelectSeatHeader from './SelectSeatHeader';
import SelectSeatNav from './SelectSeatNav';
import SelectSeatLayout from './SelectSeatLayout';

const SelectSeatIndex = () => {
  return (
    <div className="mx-4 mb-[100px]">
      <header>
        <SelectSeatHeader />
      </header>
      <nav>
        <SelectSeatNav />
      </nav>
      <section>
        <SelectSeatLayout />
      </section>
    </div>
  );
};

export default SelectSeatIndex;
