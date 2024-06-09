export interface Reserve {
    reservationName: string;
    meetingRoomId: number;
    startAt: string;
    endAt: string;
    memberIds: string[];
}

export interface ReservationModalProps {
    isVisible: boolean;
    eventName: string;
    getTimes: string;
    selectedBranch: string;
    meetingRoomName: string;
}