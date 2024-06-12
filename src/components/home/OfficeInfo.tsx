'use client';
import React, { useEffect } from 'react';
import { getTodayReservationList } from '../reservation/remote/myreservation';
import { useQuery } from 'react-query';
import OfficeInfoNone from './officeInfo/OfficeInfoNone';
import OfficeInfoFocus from './officeInfo/OfficeInfoFocus';
import OfficeInfoRecharging from './officeInfo/OfficeInfoRecharging';
import OfficeInfoMeeting from './officeInfo/OfficeInfoMeeting';
import { todayListData } from '../reservation/model/myreservation';
import { useIsCurrentBranch } from '@/store/isCurrentBranch.store';
import { useBranchStore } from '@/store/branch.store';

const OfficeInfo = () => {
  const { data } = useQuery(['todayReservationList'], () => getTodayReservationList());
  const { setIsCurrent } = useIsCurrentBranch();
  const selectedBranch = useBranchStore((state) => state.selectedBranch);

  useEffect(() => {
    if (data && selectedBranch) {
      const findBranch = data.find(
        (room: todayListData) => room.branchName === selectedBranch.branchName
      );
      if (!findBranch) {
        setIsCurrent(false);
      } else {
        setIsCurrent(true);
      }
    }
    if (data?.length == 0) {
      setIsCurrent(true);
    }
  }, [selectedBranch, setIsCurrent, data]);

  if (!data) {
    return null;
  }

  return (
    <div>
      {data && data.length == 0 ? <OfficeInfoNone /> : null}
      {data &&
        data.map((room: todayListData, i: number) => {
          if (room.spaceType == 'FOCUSDESK') {
            return <OfficeInfoFocus data={room} key={i} />;
          } else if (room.spaceType == 'MEETINGROOM') {
            return <OfficeInfoMeeting data={room} key={i} />;
          } else {
            return <OfficeInfoRecharging data={room} key={i} />;
          }
        })}
    </div>
  );
};

export default OfficeInfo;
