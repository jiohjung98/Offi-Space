import React, { useState } from 'react';
import SelectSeatHeader from './SelectSeatHeader';
import SelectSeatNav from './SelectSeatNav';
import SelectSeatLayout from './SelectSeatLayout';
import ConfirmModal from './ConfirmModal';
import CheckModal from './CheckModal';

const SelectSeatIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [modalDeskId, setModalDeskId] = useState<number | null>(null); //check모달에서 쓰일 deskId

  return (
    <div className="mx-4 mb-[100px]">
      <header>
        <SelectSeatHeader />
      </header>
      <nav>
        <SelectSeatNav />
      </nav>
      <section>
        <SelectSeatLayout
          setModalOpen={setModalOpen}
          setCheckModal={setCheckModal}
          setModalDeskId={setModalDeskId}
        />
      </section>
      {modalOpen ? <ConfirmModal setModalOpen={setModalOpen} /> : null}
      {checkModal ? (
        <CheckModal
          setCheckModal={setCheckModal}
          modalDeskId={modalDeskId}
          setModalOpen={setModalOpen}
        />
      ) : null}
    </div>
  );
};

export default SelectSeatIndex;
