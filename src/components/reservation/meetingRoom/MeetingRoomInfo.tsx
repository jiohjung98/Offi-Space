/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { getMeetingRoomInfo } from '@/api/reservation/getMeetingRoomInfo';
import { MeetingRoomInfo } from "@/api/types/room";
import Image from "next/image";
import { IoIosArrowRoundBack } from 'react-icons/io';

const MeetingRoomInfo = () => {
    const [meetingRoom, setMeetingRoom] = useState<MeetingRoomInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { meetingRoomId } = router.query;

    const handleBackClick = () => {
        router.push('/reservation');
    };

    useEffect(() => {
        if (meetingRoomId) {
            getMeetingRoomInfo(meetingRoomId as string)
                .then(data => {
                    setMeetingRoom(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [meetingRoomId]);

    if (loading) {
        return <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="loader"></div>
            </div>
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!meetingRoom) {
        return <div>No meeting room data</div>;
    }

    return (
        <div className="px-4 mt-[20px] mb-[100px] ">
            <IoIosArrowRoundBack size={40} className="mr-auto" onClick={handleBackClick} />
            <Image
                src={meetingRoom.meetingRoomImage || '/meetingRoomSqaure.svg'}
                width={393}
                height={124}
                alt='meetingRoomImage'
                className="object-cover"
            />
            <div className="flex w-full items-center mt-[24px]">
                <div className="text-black/opacity-20 text-lg font-medium font-['Pretendard']">
                    {meetingRoom.branchName}
                </div>
                <div className="ml-auto mr-[10px] text-neutral-400 text-sm font-normal font-['Pretendard'] leading-[21px]">지점 상세보기</div>
            </div>
            <div className="flex flex-col w-full mt-[24px]">
                <div className="text-black/opacity-20 text-lg font-bold font-['Pretendard']">{meetingRoom.meetingRoomName}</div>
                <div className="flex flex-row items-center">
                    <Image src={'/floor.svg'} width={14} height={14} alt="floor" className="mr-[6px]" />
                    <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mr-[12px] mt-[2px]">
                        {meetingRoom.meetingRoomFloor}층
                    </div>
                    <Image src={'/capacity.svg'} width={14} height={14} alt="capacity" className="mr-[6px]" />
                    <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mr-[12px] mt-[2px]">
                        1~{meetingRoom.meetingRoomCapacity}명
                    </div>
                    <Image src={'/check.svg'} width={14} height={14} alt="check" className="mr-[6px]" />
                    <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mt-[2px]">
                        {meetingRoom.equipments.join(', ')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingRoomInfo;
