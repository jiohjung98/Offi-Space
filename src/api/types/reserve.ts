export interface Reserve {
    reservationName: string;
    meetingRoomId: number;
    startAt: string;
    endAt: string;
    memberIds: number[];
}

export interface ReservationModalProps {
    isVisible: boolean;
    onClose: () => void;
    eventName: string;
    getTimes: string;
    selectedBranch: string;
    meetingRoomName: string;
}