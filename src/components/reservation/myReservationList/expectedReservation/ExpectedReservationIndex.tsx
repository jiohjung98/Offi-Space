import React from 'react';
import { getExpectedReservationList } from '../../remote/myreservation';
import { useQuery } from 'react-query';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import { motion } from 'framer-motion';
import MeetingRoomItem from '../roomTypeItem/MeetingRoomItem';
import FocuszoneItem from '../roomTypeItem/FocuszoneItem';
import RechargingItem from '../roomTypeItem/RechargingItem';

interface Reservation {
  branchName: string;
  endAt: string;
  memberImageUrls: string[];
  memberType: string;
  reservationId: number;
  reservationName: string;
  spaceFloor: number;
  spaceName: string;
  spaceType: string;
  startAt: string;
}

const groupByDate = (reservations: Reservation[]): Record<string, Reservation[]> => {
  return reservations.reduce(
    (acc, reservation) => {
      const date = format(parseISO(reservation.startAt), 'MM.dd EEE요일', { locale: ko });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(reservation);
      return acc;
    },
    {} as Record<string, Reservation[]>
  );
};

const ExpectedReservationIndex = () => {
  const { data } = useQuery(['expectedReservationList'], () =>
    getExpectedReservationList()
  );

  if (!data) return null;

  const seperatedDate = groupByDate(data);

  return (
    <div>
      {Object.keys(seperatedDate)
        .sort()
        .map((date) => (
          <div key={date}>
            <div className=" bg-space-purple-light flex items-center justify-between">
              <div className="px-4 py-2 text-space-purple text-base font-semibold">
                {date}
              </div>
              <div className="px-4 py-1 text-space-purple text-base font-normal">
                {seperatedDate[date].length}개의 일정
              </div>
            </div>
            {seperatedDate[date].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, translateX: -90 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                  delay: 0.1
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
              </motion.div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default ExpectedReservationIndex;
