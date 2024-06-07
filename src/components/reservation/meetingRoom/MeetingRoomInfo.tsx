import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getMeetingRoomInfo } from '@/api/reservation/getMeetingRoomInfo';
import { searchMembers } from '@/api/reservation/searchMembers';
import { MeetingRoomInfo as MeetingRoomInfoType } from "@/api/types/room";
import { Member } from "@/api/types/member";
import Image from "next/image";
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useBranchStore2 } from '@/store/reserve.store';
import { getSelectedOfficeInfo } from '@/api/map/getSelectedOffice';
import { Reserve } from '@/api/types/reserve';
import { reserveMeetingRoom } from '@/api/reservation/reserveMeetingRoom';
import ReservationModal from './ReservationModal';
import { useBranchStore } from '@/store/branch.store';

const MeetingRoomInfo = () => {
    const [meetingRoom, setMeetingRoom] = useState<MeetingRoomInfoType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [eventName, setEventName] = useState('');
    const [showReservationModal, setShowReservationModal] = useState(false); 
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [storedGetTime, setStoredGetTime] = useState('');
    const [storedStartTime, setStoredStartTime] = useState('');
    const [storedEndTime, setStoredEndTime] = useState('');
    const [storedMeetingRoomId, setStoredMeetingRoomId] = useState('');
    const [formattedGetTime, setFormattedGetTime] = useState('');
    const [formattedStartTime, setFormattedStartTime] = useState('');
    const [formattedEndTime, setFormattedEndTime] = useState('');

    const [inviteableMembers, setInviteableMembers] = useState<Member[]>([]);
    const [nonInviteableMembers, setNonInviteableMembers] = useState<Member[]>([]);

    
    const handleImageClick = () => {
        inputRef.current?.focus();
    };

    const selectedBranch = useBranchStore((state) => state.selectedBranch);
    const updatedTimeSelected = useBranchStore((state) => state.updatedTimeSelected);
    const reservedBranch = useBranchStore2((state) => state.reservedBranch);
    const updatedTimeReserved = useBranchStore2((state) => state.updatedTimeReserved);
  
    const currentBranch =
      updatedTimeSelected && updatedTimeReserved && updatedTimeSelected > updatedTimeReserved
        ? selectedBranch
        : reservedBranch;
  

    const router = useRouter();

    const { meetingRoomId } = router.query;

    useEffect(() => {
        const getTimes = router.query.startTime as string;
        const startsTime = router.query.startedAt as string;
        const endsTime = router.query.endedAt as string;
        const { meetingRoomId } = router.query;

        if (getTimes && startsTime && endsTime && meetingRoomId) {
            localStorage.setItem('getAt', getTimes);
            localStorage.setItem('startedAt', startsTime);
            localStorage.setItem('endedAt', endsTime);
            localStorage.setItem('meetingRoomId', meetingRoomId as string);

            setStoredGetTime(getTimes);
            setStoredStartTime(startsTime);
            setStoredEndTime(endsTime);
            setStoredMeetingRoomId(meetingRoomId as string);
        } else {
            const savedGetTime = localStorage.getItem('getAt');
            const savedStartTime = localStorage.getItem('startedAt');
            const savedEndTime = localStorage.getItem('endedAt');
            const savedMeetingRoomId = localStorage.getItem('meetingRoomId');

            if (savedGetTime && savedStartTime && savedEndTime && savedMeetingRoomId) {
                setStoredGetTime(savedGetTime);
                setStoredStartTime(savedStartTime);
                setStoredEndTime(savedEndTime);
                setStoredMeetingRoomId(savedMeetingRoomId);
            }
        }
    }, [router.query]);

    useEffect(() => {
        const formattedStart = `${storedStartTime}.220Z`;
        const formattedEnd = `${storedEndTime}.220Z`;

        setFormattedStartTime(formattedStart);
        setFormattedEndTime(formattedEnd);
        setFormattedGetTime(storedGetTime);
    }, [storedGetTime, storedStartTime, storedEndTime, storedMeetingRoomId]);

    const handleBackClick = () => {
        router.back();
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

    const handleOfficeInfo = async () => {
        try {
            const data = await getSelectedOfficeInfo(currentBranch!.branchName); 
            const officeInfo = data.data; 
            console.log(officeInfo);
            router.push({
                pathname: `/branches/${encodeURIComponent(currentBranch!.branchName)}`,
                query: { 
                    name: currentBranch!.branchName, 
                    address: officeInfo.branchAddress,
                    branchPhoneNumber: officeInfo.branchPhoneNumber,
                    roadFromStation: officeInfo.roadFromStation,
                    stationToBranch: officeInfo.stationToBranch.join(',')
                }
            }, `/branches/${encodeURIComponent(currentBranch!.branchName)}`);
        } catch (error) {
            console.error('Error fetching office info:', error);
        }
    };

    const handleReseve = () => {   
        const reservation: Reserve = {
            reservationName: eventName,
            meetingRoomId: meetingRoom!.meetingRoomId, 
            startAt: formattedStartTime, 
            endAt: formattedEndTime,
            memberIds: [] 
        };
    
        reserveMeetingRoom(reservation)
            .then(() => {
                console.log('Meeting room reserved successfully');
                setShowReservationModal(true); 
            })
            .catch(error => {
                console.error('Error reserving meeting room:', error);
            });
    };

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
      
        if (searchTerm.trim().length > 0) {
          try {
            const results = await searchMembers(searchTerm, storedStartTime, storedEndTime);
            setInviteableMembers(results.memberCanInviteList);
            setNonInviteableMembers(results.memberCantInviteList);
          } catch (error) {
            console.error('Error searching members:', error);
          }
        } else {
          setInviteableMembers([]);
          setNonInviteableMembers([]);
        }
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
            </div>
            <Image
                src={meetingRoom.meetingRoomImage || '/meetingRoomSqaure.svg'}
                width={393}
                height={124}
                alt='meetingRoomImage'
                className="object-cover"
            />
            <div className='px-4'>
                <div className="flex w-full items-center mt-[24px]">
                    <div className="text-black/opacity-20 text-lg font-medium font-['Pretendard']">
                        {meetingRoom.branchName}
                    </div>
                    <div className="ml-auto flex" onClick={handleOfficeInfo}>
                        <div className="mr-[5px] text-neutral-400 text-sm font-normal font-['Pretendard'] leading-[21px]">지점 상세보기</div>
                        <Image src={'/nextArrow.svg'} width={5} height={11} alt="arrow" className="mr-[6px] mb-[2px]" />
                    </div>
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
            <div className="w-[full] mt-[32px] h-1 bg-neutral-200" />
            <div className="px-4 py-2">
            <div className="flex-none w-full h-[50px] py-2 flex items-center cursor-pointer" onClick={() => console.log("Edit clicked")}>
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    ref={inputRef}
                    className="w-full h-full outline-none bg-transparent"
                    placeholder="일정명을 작성하세요."
                />
                <Image
                    src={'/pencil.svg'}
                    width={14}
                    height={14}
                    alt="edit"
                    className="ml-2"
                    onClick={handleImageClick}
                />
            </div>
            </div>
            <div className="w-[full] h-0.5 bg-neutral-200" />
            <div className="flex px-4 my-4">
                <div className="text-black/opacity-20 text-base font-bold font-['Pretendard'] my-auto">일정</div>
                <div className="flex-none ml-[8px]">
                    <div className="text-indigo-700 text-base font-semibold font-['Pretendard']">
                        {storedGetTime ? (
                            `${storedGetTime}`
                        ) : (
                            '시간을 선택해주세요'
                        )}
                    </div>
                </div>
            </div>
            <div className="w-[full] h-0.5 bg-neutral-200" />
            <div className="px-4">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full h-10 px-2 py-1 outline-none border border-gray-300 rounded"
                placeholder="멤버 검색"
            />
            {(inviteableMembers.length > 0 || nonInviteableMembers.length > 0) && (
                <ul className="mt-2 border border-gray-300 rounded">
                {inviteableMembers.map((member) => (
                    <li key={member.memberId} className="p-2 border-b border-gray-200 last:border-0 flex items-center">
                    <Image src={member.imageUrl} width={24} height={24} alt="member image" className="mr-2 rounded-full" />
                    <span>{member.memberName} ({member.memberEmail})</span>
                    <button className="ml-auto text-indigo-700">+</button>
                    </li>
                ))}
                {nonInviteableMembers.map((member) => (
                    <li key={member.memberId} className="p-2 border-b border-gray-200 last:border-0 flex items-center opacity-50">
                    <Image src={member.imageUrl} width={24} height={24} alt="member image" className="mr-2 rounded-full" />
                    <span>{member.memberName} ({member.memberEmail})</span>
                    <button className="ml-auto text-gray-400" disabled>+</button>
                    </li>
                ))}
                </ul>
            )}
            </div>
            <footer className='w-full text-center py-[30px] mb-[50px] left-0 right-0'>
                <button className='w-[361px] h-12 bg-indigo-700 rounded-lg border border-indigo-700 text-center text-stone-50 text-[15px] font-semibold mx-auto' onClick={handleReseve}>예약하기</button>
            </footer>
            <ReservationModal
                isVisible={showReservationModal}
                eventName={eventName}
                getTimes={formattedGetTime}
                selectedBranch={meetingRoom.branchName}
                meetingRoomName={meetingRoom.meetingRoomName}
            />
        </div>
    );
};

export default MeetingRoomInfo;
