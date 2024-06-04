import MainContainer from '@/components/shared/MainContainer';
import MeetingRoomInfo from '@/components/reservation/meetingRoom/MeetingRoomInfo';

const MeetingRoomDetailPage = () => {

  return (
    <MainContainer>
      <div className="flex flex-col justify-center items-center gap-[39px] h-screen">
        <div className="w-full h-full">
          <MeetingRoomInfo />
        </div>
      </div>
    </MainContainer>
  );
};

export default MeetingRoomDetailPage;
