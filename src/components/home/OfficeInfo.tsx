'use client';
import React from 'react';
import { getTodayReservationList } from '../reservation/remote/myreservation';
import { useQuery } from 'react-query';
import OfficeInfoNone from './officeInfo/OfficeInfoNone';
import OfficeInfoFocus from './officeInfo/OfficeInfoFocus';
import OfficeInfoRecharging from './officeInfo/OfficeInfoRecharging';
import OfficeInfoMeeting from './officeInfo/OfficeInfoMeeting';
import { todayListData } from '../reservation/model/myreservation';

const OfficeInfo = () => {
  const { data } = useQuery(['todayReservationList'], () => getTodayReservationList());

  if (data == undefined || data == null) {
    return null;
  }

  return (
    <div>
      {data.length == 0 ? <OfficeInfoNone /> : null}
      {data.map((room: todayListData, i: number) => {
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
