import React from 'react';
import BgPurpleLay from './BgPurpleLay';
import FocuszoneHead from './FocuszoneHead';
import AvailableTitle from './AvailableTitle';
import AvailavleCount from './AvailavleCount';
import FocusInfo from './FocusInfo';
import FocusReservationBtn from './FocusReservationBtn';
import { motion } from 'framer-motion';

const FocuszoneIndex = () => {
  return (
    <div className="mb-[100px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          delay: 0.1
        }}>
        <BgPurpleLay>
          <FocuszoneHead />
          <AvailableTitle />
        </BgPurpleLay>
        <AvailavleCount />
      </motion.div>
      <FocusInfo />
      <FocusReservationBtn />
    </div>
  );
};

export default FocuszoneIndex;
