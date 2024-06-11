'use client';
import React, { useEffect } from 'react';
import MyReservationHeader from './MyReservationHeader';
import MyReservationNav from './MyReservationNav';
import TodayReservation from './TodayReservation';
import { useReservationStore } from '@/store/reservationModal.store';
import FRDetailModal from './modal/FRDetailModal';
import MeetingDetailModal from './modal/MeetingDetailModal';
import ReservationDeleteModal from './modal/ReservationDeleteModal';
import ExpectedReservationIndex from './expectedReservation/ExpectedReservationIndex';
import { getReservationDetail } from '../remote/myreservation';
import { useQuery } from 'react-query';

const MyReservationListIndex = () => {
  const { open, reservationId, isMeeting, deleteOpen, deleteDeskId } =
    useReservationStore();

  const { data } = useQuery(
    ['reservationDetail', reservationId],
    async () => await getReservationDetail(reservationId),
    {
      enabled: reservationId != null
    }
  );

  useEffect(() => {
    console.log(data);
    // if (!LateDataTest) {
    //   alert('이미 종료된 일정입니다');
    //   router.push('/');
    // }
  }, [data]);

  if (data == undefined) {
    return null;
  }
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
