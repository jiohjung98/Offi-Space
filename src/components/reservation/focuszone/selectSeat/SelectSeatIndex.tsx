import React, { useState } from 'react';
import SelectSeatHeader from './SelectSeatHeader';
import SelectSeatNav from './SelectSeatNav';
import SelectSeatLayout from './SelectSeatLayout';
import ConfirmModal from './ConfirmModal';
import CheckModal from './CheckModal';
import { useBranchStore } from '@/store/branch.store';
import { motion } from 'framer-motion';

const SelectSeatIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [modalDeskId, setModalDeskId] = useState<number | null>(null); //check모달에서 쓰일 deskId
  const [modalDeskNumber, setModalDeskNumber] = useState<string | null>(null); //confirm모달에서 쓰일 deskNumber

  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const branchId = selectedBranch?.branchId;

  if (!branchId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-4 mb-[100px]">
      <header>
        <SelectSeatHeader />
      </header>
      <nav>
        <SelectSeatNav />
      </nav>
      <section>
        <motion.div
          initial={{ opacity: 0, translateX: -90 }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut'
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}>
          <SelectSeatLayout
            setModalOpen={setModalOpen}
            setCheckModal={setCheckModal}
            setModalDeskId={setModalDeskId}
            setModalDeskNumber={setModalDeskNumber}
            branchId={branchId}
          />
        </motion.div>
      </section>
      {modalOpen ? (
        <ConfirmModal setModalOpen={setModalOpen} modalDeskNumber={modalDeskNumber} />
      ) : null}
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
