export interface MeetingRoom {
    meetingRoomId: number;
    meetingRoomName: string;
    meetingRoomFloor: number;
    meetingRoomCapacity: number;
    meetingRoomImage: string | null;
  }
  
  export interface GetMeetingRoomsParams {
    startAt: string;
    endAt: string;
    branchName: string;
    meetingRoomTypes?: ('MINI' | 'STANDARD' | 'MEDIUM' | 'STATE')[];
    projectorExists?: boolean;
    canVideoConference?: boolean;
    isPrivate?: boolean;
    sortTarget?: 'roomCapacity' | 'roomFloor';
    sortDirection?: 'ASC' | 'DESC';
  }

  export interface MeetingRoomInfo extends MeetingRoom {
    equipments: string[];
    branchId: string;
    branchName: string;
  }
  
  export interface MeetingRoomsResponse {
      meetingRoomForListList: MeetingRoom[];
      toastType: string;
  }