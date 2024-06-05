export interface Reserve {
    reservationName: string;
    meetingRoomId: number;
    startAt: string;
    endAt: string;
    memberIds: number[];
}