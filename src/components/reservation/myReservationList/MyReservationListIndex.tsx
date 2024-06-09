'use client';
import React from 'react';
import MyReservationHeader from './MyReservationHeader';
import MyReservationNav from './MyReservationNav';
import TodayReservation from './TodayReservation';
import { useReservationStore } from '@/store/reservationModal.store';
import FRDetailModal from './modal/FRDetailModal';
import MeetingDetailModal from './modal/MeetingDetailModal';
import ReservationDeleteModal from './modal/ReservationDeleteModal';
import ExpectedReservationIndex from './expectedReservation/ExpectedReservationIndex';

const MyReservationListIndex = () => {
  const { open, reservationId, isMeeting, deleteOpen, deleteDeskId } =
    useReservationStore();
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
      <section>
        <ExpectedReservationIndex />
      </section>

      {open && reservationId !== null && isMeeting == false && <FRDetailModal />}
      {open && reservationId !== null && isMeeting == true && <MeetingDetailModal />}
      {deleteOpen && deleteDeskId !== null && <ReservationDeleteModal />}
    </div>
  );
};

export default MyReservationListIndex;
