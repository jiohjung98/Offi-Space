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
    const [showSearch, setShowSearch] = useState(false);
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
    const [addedMembers, setAddedMembers] = useState<Member[]>([]);
    const [invitedMemberIds, setInvitedMemberIds] = useState<string[]>([]);
    const [isReserveButtonDisabled, setIsReserveButtonDisabled] = useState(true);

    useEffect(() => {
        if (eventName.trim() === '') {
            setIsReserveButtonDisabled(true);
        } else {
            setIsReserveButtonDisabled(false);
        }
    }, [eventName]);


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

    
    console.log(`current Branch = ${currentBranch?.branchName}`);
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
            console.log(currentBranch!.branchName);
            const data = await getSelectedOfficeInfo(currentBranch!.branchName);
            console.log(data);
            const officeInfo = data.data;
            console.log(officeInfo);
            router.push({
                // pathname: `/branches/${encodeURIComponent(officeInfo!.branchName)}`,
                pathname: `/branches/${encodeURIComponent(currentBranch!.branchName)}`,
                query: {
                    name: officeInfo.branchName,
                    address: officeInfo.branchAddress,
                    branchPhoneNumber: officeInfo.branchPhoneNumber,
                    roadFromStation: officeInfo.roadFromStation,
                    stationToBranch: officeInfo.stationToBranch.join(','),
                    branchId: officeInfo.branchId
                }
            }, `/branches/${encodeURIComponent(currentBranch!.branchName)}`);
        } catch (error) {
            console.error('Error fetching office info:', error);
        }
    };

    const handleReserve = () => {
        const reservation: Reserve = {
            reservationName: eventName,
            meetingRoomId: meetingRoom!.meetingRoomId,
            startAt: formattedStartTime,
            endAt: formattedEndTime,
            memberIds: addedMembers.map(member => (member.memberId))
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

    const handleAddMember = (member: Member) => {
        setAddedMembers([...addedMembers, member]);
        setInvitedMemberIds([...invitedMemberIds, member.memberId]);
    };

    const handleRemoveMember = (member: Member) => {
        setAddedMembers(addedMembers.filter(m => m.memberId !== member.memberId));
        setInvitedMemberIds(invitedMemberIds.filter(id => id !== member.memberId)); 
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
        <div className='min-h-screen flex flex-col'>
        <div className="px-4 mt-[20px]">
            <IoIosArrowRoundBack size={40} className="mr-auto cursor-pointer" onClick={handleBackClick} />
        </div>
        <Image
            src={meetingRoom.meetingRoomImage || '/meetingRoomSqaure.svg'}
            width={393}
            height={124}
            alt='meetingRoomImage'
            className="object-cover"
        />
        <div className='px-4 flex-grow overflow-y-auto'>
            <div className="flex w-full items-center mt-[24px]">
                <div className="text-black/opacity-20 text-lg font-medium my-auto items-center font-['Pretendard']">
                    {meetingRoom.branchName}
                </div>
                <div className="ml-auto flex cursor-pointer" onClick={handleOfficeInfo}>
                    <div className="mr-[5px] text-neutral-400 text-sm font-normal font-['Pretendard'] leading-[21px]">지점 상세보기</div>
                    <Image src={'/nextArrow.svg'} width={5} height={11} alt="arrow" className="mr-[6px] mb-[2px]" />
                </div>
            </div>
            <div className="flex flex-col w-full mt-[24px]">
                <div className="text-black/opacity-20 text-lg font-bold font-['Pretendard']">{meetingRoom.meetingRoomName}</div>
                <div className="flex flex-row items-center">
                    <Image src={'/floor.svg'} width={14} height={14} alt="floor" className="mr-[6px]" />
                    <div className="text-stone-500 text-xs font-normal font-['Pretendard'] mr-[12px] my-auto">
                        {meetingRoom.meetingRoomFloor < 0 ? `B${Math.abs(meetingRoom.meetingRoomFloor)}` : `${meetingRoom.meetingRoomFloor}`}층
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
            <div className="px-4 mt-[24px]">
                <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowSearch(!showSearch)}>
                    <div className='flex flex-row items-center'>
                        <div className="text-black/opacity-20 text-base font-bold font-['Pretendard']">
                            참석 멤버
                        </div>
                        {!showSearch && (
                            <>
                                {addedMembers.length > 0 && (
                                    <div className="flex ml-[10px]">
                                        <div className="text-indigo-700 text-base font-semibold font-['Pretendard']">
                                            {addedMembers.length === 1 
                                                ? addedMembers[0].memberName 
                                                : `${addedMembers[0].memberName} 외 ${addedMembers.length - 1}인`}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    {showSearch ? (
                        <Image src={'/reservation/topArrow.svg'} width={14} height={7} alt="arrow" className="" />
                    ) : (
                        <Image src={'/reservation/bottomArrow.svg'} width={14} height={7} alt="arrow" className="" />
                    )}
                </div>
                {showSearch && (
                    <>
                    {addedMembers.length > 0 && (
                        <div className="mt-4 flex w-full overflow-x-auto">
                            <div className="flex flex-nowrap">
                                {addedMembers.map(member => (
                                    <div key={member.memberId} className="flex items-center mr-2.5 flex-shrink-0">
                                        <div className='px-2.5 py-1 rounded-xl border border-zinc-400 justify-start items-center inline-flex'>
                                            <div className="text-neutral-400 text-sm font-medium font-['Pretendard'] mt-[2px] whitespace-nowrap mr-2 flex-shrink-0">
                                                {member.memberName}
                                            </div>
                                            <Image src={'/reservation/deleteBtn.svg'} width={10} height={10} alt="delete user" className="cursor-pointer flex-shrink-0" onClick={() => handleRemoveMember(member)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                        <div className="relative w-full mt-[20px]">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full h-10 pl-10 py-1 outline-none border border-gray-300 rounded placeholder-gray-400"
                                placeholder="참석자의 이메일 또는 이름을 검색하세요."
                            />
                            <img src="/map/Search.png" alt="search" className="absolute left-3 top-2.5 w-5 h-5" />
                        </div>
                        {(inviteableMembers.length > 0 || nonInviteableMembers.length > 0) && (
                            <ul className="mt-2">
                                {inviteableMembers.map((member) => (
                                    <li key={member.memberId} className="p-2 flex items-center">
                                    <div className="relative w-8 h-8 mr-2 rounded-full overflow-hidden">
                                      <Image src={member.imageUrl} layout="fill" objectFit="cover" alt="member image" />
                                    </div>
                                    <div className="flex flex-col cursor-pointer">
                                      <span>{member.memberName}</span>
                                      <span className="text-sm text-gray-500">{member.memberEmail}</span>
                                    </div>
                                    {invitedMemberIds.includes(member.memberId) ? (
                                      <Image src="/reservation/InvitedUser.svg" width={28} height={28} alt="invited user" className="ml-auto rounded-full cursor-not-allowed" />
                                    ) : (
                                      <Image src="/reservation/CanInviteUser.png" width={28} height={28} alt="invite user" className="ml-auto rounded-full cursor-pointer" onClick={() => handleAddMember(member)} />
                                    )}
                                  </li>
                                ))}
                                {nonInviteableMembers.map((member) => (
                                    <li key={member.memberId} className="p-2 flex items-center opacity-50">
                                        <Image src={member.imageUrl} width={32} height={32} alt="member image" className="mr-2 rounded-full" />
                                        <div className="flex flex-col">
                                            <div className='flex flex-row items-center'>
                                            <span>{member.memberName}</span>
                                            <Image src={'/reservation/ExclamationMark.svg'} width={14} height={14} alt="ExclamationMark" className="ml-[6.5px]" />
                                            </div>
                                            <span className="text-sm text-gray-500">{member.memberEmail}</span>
                                        </div>
                                        <Image src={'/reservation/CantInviteUser.svg'} width={28} height={28} alt="invite user" className="ml-auto rounded-full"/>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
            <div className="flex px-4 items-start mt-[24px]">
                <Image src={'/reservation/ExclamationMark.svg'} alt="Location" width={14} height={14} className="mr-2" />
                <p className="text-zinc-400 text-xs font-normal font-['Pretendard'] leading-tight">일정이 이미 있는 사용자는 참석 멤버로 등록할 수 없어요! 일정을 조정한 뒤 추가할 수 있습니다.</p>
            </div>
            <footer className={`w-full text-center py-[30px] ${showSearch ? 'mb-[100px]' : 'mb-[70px]'} left-0 right-0`}>
            <button 
                className={`w-[100%] h-12 rounded-lg border text-center text-white text-[15px] font-semibold mx-auto ${isReserveButtonDisabled ? 'bg-gray-400 border-gray-400' : 'reserveBtn border-indigo-700 text-stone-50'}`} 
                onClick={handleReserve} 
                disabled={isReserveButtonDisabled}
            >
                예약
            </button>
        </footer>
        </div>
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
