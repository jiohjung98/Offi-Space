'use client';
import React from 'react';
import MyReservationHeader from './MyReservationHeader';
import MyReservationNav from './MyReservationNav';
import TodayReservation from './TodayReservation';
import { useReservationStore } from '@/store/reservationModal.store';
import FRDetailModal from './FRDetailModal';
import MeetingDetailModal from './MeetingDetailModal';

const MyReservationListIndex = () => {
  const { open, reservationId, isMeeting } = useReservationStore();
  return (
    <div className="mb-[100px] ">
      <header>
        <MyReservationHeader />
      </header>
      <nav>
        <MyReservationNav />
      </nav>
      <section>
        <TodayReservation />
      </section>
      {open && reservationId !== null && isMeeting == false && <FRDetailModal />}
      {open && reservationId !== null && isMeeting == true && <MeetingDetailModal />}
    </div>
  );
};

export default MyReservationListIndex;
