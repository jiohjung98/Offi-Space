'use client';
import { useMember } from '@/store/user';
import React from 'react';

const UserInfo = () => {
  const user = useMember();
  return (
    <div className="mt-5 w-full rounded-t bg-white border-r border-l border-t border-gray-200">
      <div className="bg-white  flex justify-between items-center mx-5 border-b-2 border-gray-100">
        <div className="flex gap-1 text-lg my-5 ">
          <div className="text-space-purple font-bold">{user.memberName}</div>
          <div className="text-gray-700">님</div>
        </div>

        <div className="text-xs font-normal text-gray-700 my-5 ">{user.companyName}</div>
      </div>
    </div>
  );
};

export default UserInfo;
