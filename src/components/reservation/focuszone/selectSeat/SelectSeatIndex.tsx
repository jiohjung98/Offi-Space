import React, { useState } from 'react';
import SelectSeatHeader from './SelectSeatHeader';
import SelectSeatNav from './SelectSeatNav';
import SelectSeatLayout from './SelectSeatLayout';
import ConfirmModal from './ConfirmModal';
import CheckModal from './CheckModal';
import { useBranchStore } from '@/store/branch.store';
import { motion } from 'framer-motion';
import { useBranchStore2 } from '@/store/reserve.store';

const SelectSeatIndex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  const [modalDeskId, setModalDeskId] = useState<number | null>(null); //check모달에서 쓰일 deskId
  const [modalDeskNumber, setModalDeskNumber] = useState<string | null>(null); //confirm모달에서 쓰일 deskNumber


  //지오님작업 : SelectSeatIndex 페이지에 접속 할 시  useBranchStore(기존 메인페이지 지점)의 branchId로 좌석 배치도를 받아오고 있습니다.
  // nav바, 내 주변에서 새롭게 지점이 설정되면 해당 지점의 id를 받아올 수 있게 해주시면 해주시면 되고,
  // nav바, 내 주변에서 지점 선택을 따로 하지 않았을시는 기존 그대로 useBranchStore의 branchId를 받아오면 됩니다
  // 가져와주시기만 하면 useQuery연결은 제가 작업하겠습니다.
  const selectedBranch = useBranchStore((state) => state.selectedBranch);
  const updatedTimeSelected = useBranchStore((state) => state.updatedTimeSelected);
  const reservedBranch = useBranchStore2((state) => state.reservedBranch);
  const updatedTimeReserved = useBranchStore2((state) => state.updatedTimeReserved);

  const currentBranch =
    updatedTimeSelected && updatedTimeReserved && updatedTimeSelected > updatedTimeReserved
      ? selectedBranch
      : reservedBranch;

  const branchId = currentBranch?.branchId;

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
          branch={currentBranch}        />
      ) : null}
    </div>
  );
};

export default SelectSeatIndex;
