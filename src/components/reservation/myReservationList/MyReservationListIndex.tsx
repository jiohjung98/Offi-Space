import React from 'react';
import MyReservationHeader from './MyReservationHeader';
import MyReservationNav from './MyReservationNav';
import TodayReservation from './TodayReservation';

const MyReservationListIndex = () => {
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
    </div>
  );
};

export default MyReservationListIndex;
