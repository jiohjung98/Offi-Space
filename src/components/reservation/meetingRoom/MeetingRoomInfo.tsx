import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getMeetingRoomInfo } from '@/api/reservation/getMeetingRoomInfo';
import { MeetingRoomInfo as MeetingRoomInfoType } from "@/api/types/room";
import Image from "next/image";
import { IoIosArrowRoundBack } from 'react-icons/io';
import MeetingRoomDatePickerModal from './MeetingRoomDatePicker';

const MeetingRoomInfo = () => {
    const [meetingRoom, setMeetingRoom] = useState<MeetingRoomInfoType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [initialStartTime, setInitialStartTime] = useState<Date>(new Date());
    const [initialEndTime, setInitialEndTime] = useState<Date>(new Date());
    const [selectedTimeRange, setSelectedTimeRange] = useState<string | null>(null); 

    const router = useRouter();
    const { meetingRoomId, startTime } = router.query;

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

    useEffect(() => {
        if (startTime) {
            const [date, time] = (startTime as string).split(' ');
            const [month, day] = date.split('.');
            const [start, end] = time.split('~');
            const [startHour, startMinute] = start.split(':');
            const [endHour, endMinute] = end.split(':');
            const now = new Date();

            const initialStartDate = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day), parseInt(startHour), parseInt(startMinute));
            const initialEndDate = new Date(now.getFullYear(), parseInt(month) - 1, parseInt(day), parseInt(endHour), parseInt(endMinute));

            setInitialStartTime(initialStartDate);
            setInitialEndTime(initialEndDate);
            setSelectedTimeRange(`${startTime}`); 
        }
    }, [startTime]);

    const handleConfirm = (startDate: Date, endDate: Date) => {
        const formattedStartDate = `${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')}`;
        const formattedStartTime = `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`;
        const formattedEndTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;

        setSelectedTimeRange(`${formattedStartDate} ${formattedStartTime}~${formattedEndTime}`);
        setShowModal(false); 
    };

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
        <div>
            <div className="px-4 mt-[20px]">
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
                        <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mr-[12px] mt-[2px]">
                            {meetingRoom.meetingRoomFloor}층
                        </div>
                        <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mr-[12px] mt-[2px]">
                            1~{meetingRoom.meetingRoomCapacity}명
                        </div>
                        <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mt-[2px]">
                            {meetingRoom.equipments.join(', ')}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[full] mt-[32px] h-1 bg-neutral-200" />
            <div className="px-4 mt-4">
                <div
                    className="flex-none w-[190px] h-[33px] px-3 py-2 bg-violet-100 rounded inline-flex cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    <Image src={'/calendar.svg'} width={14} height={14} alt="calendar" className="mr-[6px]" />
                    <div className="text-neutral-700 text-sm font-semibold font-['Pretendard']">{selectedTimeRange}</div>
                    <Image src={'/bottomArrow.svg'} width={11} height={11} alt="bottomArrow" className="ml-auto mr-[2px]" />
                </div>
            </div>
            {showModal && (
                <MeetingRoomDatePickerModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    onConfirm={handleConfirm}
                    initialStartTime={initialStartTime}
                    initialEndTime={initialEndTime}
                />
            )}
        </div>
    );
};

export default MeetingRoomInfo;
