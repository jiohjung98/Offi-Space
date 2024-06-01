import React, { useState } from 'react';
import SelectSeatHeader from './SelectSeatHeader';
import SelectSeatNav from './SelectSeatNav';
import SelectSeatLayout from './SelectSeatLayout';
import ConfirmModal from './ConfirmModal';

const SelectSeatIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="mx-4 mb-[100px]">
      <header>
        <SelectSeatHeader />
      </header>
      <nav>
        <SelectSeatNav />
      </nav>
      <section>
        <SelectSeatLayout setModalOpen={setModalOpen} />
      </section>
      {modalOpen ? <ConfirmModal setModalOpen={setModalOpen} /> : null}
    </div>
  );
};

export default SelectSeatIndex;
