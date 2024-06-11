import React, { useEffect } from 'react';
import FocuszoneItem from './roomTypeItem/FocuszoneItem';
import MeetingRoomItem from './roomTypeItem/MeetingRoomItem';
import RechargingItem from './roomTypeItem/RechargingItem';
import { useQuery } from 'react-query';
import { getTodayReservationList } from '../remote/myreservation';
import { todayListData } from '../model/myreservation';
import { motion } from 'framer-motion';
import { useReservationStore } from '@/store/reservationModal.store';
import { useSearchParams, useRouter } from 'next/navigation';
import { openDB } from 'idb';
const TodayReservation = () => {
  const { data } = useQuery(['todayReservationList'], () => getTodayReservationList());
  const { setOpen, setReservationId, setIsMeeting } = useReservationStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get('targetId');
  // const pathname = usePathname();
  /* eslint-disable */
  useEffect(() => {
    const fetchData = async () => {
      const value = await get('targetId');
      if (value === undefined) return;
      console.log(value);
      setOpen(true);
      setIsMeeting(true);
      setReservationId(value as any);
      del('targetId');
    };

    fetchData();
  }, [search, router]);

  async function get(key: IDBKeyRange | IDBValidKey) {
    const db = await openDB('reservationIdstore', 1, {
      upgrade(db) {
        db.createObjectStore('reservationId');
      }
    });
    const tx = db.transaction('reservationId', 'readonly');
    const value = await tx.store.get(key);
    await tx.done;
    return value;
  }

  async function del(key: IDBKeyRange | IDBValidKey) {
    const db = await openDB('reservationIdstore', 1, {
      upgrade(db) {
        db.createObjectStore('reservationId');
      }
    });
    const tx = db.transaction('reservationId', 'readwrite');
    await tx.store.delete(key);
    await tx.done;
  }

  //10초후에 사라지도록 설정
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (searchParams.toString()) {
  //       // 쿼리 스트링이 있는 경우 쿼리 스트링을 제거하고 페이지를 새로고침하지 않습니다.
  //       router.replace(pathname);
  //     }
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, [setReservationId, setOpen]);

  if (!data) {
    return null;
  }

  if (data?.length == 0) {
    return (
      <div className="border-b border-gray-300 mx-4 py-12 flex flex-col items-center justify-center text-base font-medium text-gray-500">
        <div>오늘 일정은 없네요.</div>
        <div>다양한 공간을 예약해 보세요!</div>
      </div>
    );
  }

  console.log(data);

  return (
    <ul>
      {data &&
        data?.map((item: todayListData, i: number) => (
          <motion.li
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
          </motion.li>
        ))}
    </ul>
  );
};

export default TodayReservation;
