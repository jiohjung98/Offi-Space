import React from 'react';
import FocuszoneItem from './roomTypeItem/FocuszoneItem';
import MeetingRoomItem from './roomTypeItem/MeetingRoomItem';
import RechargingItem from './roomTypeItem/RechargingItem';
import { useQuery } from 'react-query';
import { getTodayReservationList } from '../remote/myreservation';
import { todayListData } from '../model/myreservation';
import { motion } from 'framer-motion';

const TodayReservation = () => {
  const { data } = useQuery(['todayReservationList'], () => getTodayReservationList());

  if (data?.length == 0) {
    return (
      <div className="border-b border-gray-300 mx-4 py-12 flex flex-col items-center justify-center text-base font-medium text-gray-500">
        <div>예약된 일정이 없습니다.</div>
        <div>다양한 공간을 예약해 보세요!</div>
      </div>
    );
  }

  return (
    <ul>
      {data?.map((item: todayListData, i: number) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, translateX: -90 }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
            delay: i * 0.1
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}>
          {item.spaceType === 'MEETINGROOM' ? (
            <MeetingRoomItem roomData={item} />
          ) : item.spaceType === 'FOCUSDESK' ? (
            <FocuszoneItem roomData={item} />
          ) : (
            <RechargingItem roomData={item} />
          )}
        </motion.li>
      ))}
    </ul>
  );
};

export default TodayReservation;
