import { BackArrow } from '@/components/backarrow/BackArrow';
import React from 'react';

const GuidePage = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white flex flex-col gap-8">
      <div className=" mt-[40px] ml-[20px] mb-[2px]">
        <BackArrow width="40px" height="24px" name="이용 가이드" link="/mypage" />
      </div>

      <div className="px-4 ">
        <div className="text-black/opacity-20 text-lg font-bold font-['Pretendard'] leading-[27px] mb-[14px] ]">
          네트워크 이용 가이드
        </div>
        <div className="flex flex-col gap-2 relative pb-4">
          <div className="absolute left-2 w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
            <img src="/mypage/guide/Wifi.svg" alt="Wifi" className="w-4 h-4" />
          </div>
          <div className="pl-12">
            <div className="text-neutral-700 text-base font-semibold">무선 인터넷</div>
            <div className="text-neutral-600 text-sm">
              현재 층에 맞는 Offispace 와이파이에 접속해 인터넷을 사용하세요.
              <br />
              - 네트워크 명: 지점 상세페이지 확인
              <br />- 암호: 지점 상세페이지 확인
            </div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-neutral-200 mb-[16px]"></div>

        <div className="flex flex-col gap-2 relative pb-4">
          <div className="absolute left-2 w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
            <img src="/mypage/guide/Lan.svg" alt="Lan" className="w-4 h-4" />
          </div>
          <div className="pl-12">
            <div className="text-neutral-700 text-base font-semibold">유선 인터넷</div>
            <div className="text-neutral-600 text-sm">
              사무실 벽면 랜포트에 랜선을 연결해 인터넷을 사용하세요.
              <br />
              추가 랜포트나 허브가 필요하다면 매니저에게 문의하세요.
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral-200 mt-[16px] mb-[16px]"></div>

        <div className="flex flex-col gap-2 relative pb-2">
          <div className="absolute left-2 w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center">
            <img src="/mypage/guide/Ip.svg" alt="Ip" className="w-4 h-4" />
          </div>
          <div className="pl-12">
            <div className="text-neutral-700 text-base font-semibold">IP 신청</div>
            <div className="text-neutral-600 text-sm">
              공인/사설 IP 신청이 필요하거나 기타 네트워크 인프라에 관한 문의가 필요하다면
              1:1 문의를 사용해주세요.
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-neutral-200 "></div>

      <div className="px-4 py-2">
        <div className="text-black/80 text-lg font-bold mb-[8px]">공간 예약 가이드</div>
        <div className="w-[361px] text-neutral-600 text-sm font-normal font-['Pretendard'] leading-tight mb-[32px]">
          Offispace에는 목적에 맞게 사용할 수 있는 다양한 공간이 준비되어 있습니다. 앱 및
          웹페이지의 예약 메뉴를 통해 다양한 공간을 이용해보세요.
        </div>
        <div className="flex flex-row gap-2 relative pb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
              <img
                src="/mypage/guide/MeetingRoom.svg"
                alt="MeetingRoom"
                className="w-8 h-8"
              />
            </div>
            <div className="text-indigo-700 text-sm font-medium">미팅룸</div>
          </div>
          <div className="text-neutral-600 text-sm pl-[20px]">
            <img
              src="/mypage/guide/Ellipse.svg"
              alt="Ellipse"
              className="inline-block w-[2px] h-[2px] mr-1"
            />
            3~15인까지 사용할 수 있는 다양한 크기의 미팅룸이 있습니다.
            <br />
            <img
              src="/mypage/guide/Ellipse.svg"
              alt="Ellipse"
              className="inline-block w-[2px] h-[2px] mr-1"
            />
            비품 등 공간에 대한 정보는 공간 상세 페이지를 통해 확인하세요.
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral-200 mb-[16px]"></div>

        <div className="flex flex-row gap-2 relative pb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
              <img
                src="/mypage/guide/RechargingRoom.svg"
                alt="RechargingRoom"
                className="w-8 h-8"
              />
            </div>
            <div className="text-indigo-700 text-sm font-medium">리차징룸</div>
          </div>
          <div className="text-neutral-600 text-sm pl-[20px]">
            <img
              src="/mypage/guide/Ellipse.svg"
              alt="Ellipse"
              className="inline-block w-[2px] h-[2px] mr-1"
            />
            업무 중 충전이 필요할 때 사용할 수 있는 공간이 있습니다.
            <br />
            <img
              src="/mypage/guide/Ellipse.svg"
              alt="Ellipse"
              className="inline-block w-[2px] h-[2px] mr-1"
            />
            지점 별로 운영 여부가 상이하니 확인 후 예약을 진행해주세요.
          </div>
        </div>

        <div className="w-full h-[1px] bg-neutral-200 mb-[16px]"></div>

        <div className="flex flex-row gap-2 relative pb-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
              <img
                src="/mypage/guide/FocusRoom.svg"
                alt="FocusRoom"
                className="w-8 h-8"
              />
            </div>
            <div className="text-indigo-700 text-sm font-medium">포커스룸</div>
          </div>
          <div className="text-neutral-600 text-sm pl-[20px] mt-[5px]">
            <img
              src="/mypage/guide/Ellipse.svg"
              alt="Ellipse"
              className="inline-block w-[2px] h-[2px] mr-1"
            />
            파티션으로 분리된 조용한 환경에서 업무에 몰입해보세요.
          </div>
        </div>

        <div className="p-4 bg-neutral-100 rounded-md mt-[39px]">
          <div className="text-neutral-600 text-sm font-bold">이용 Tip!</div>
          <div className="text-neutral-600 text-sm">
            <br />
            음식 섭취는?
            <br />
            모두를 위해 취식이 가능한 공간에서만 해주세요.
            <br />
            <br />
            이용 종료 후에는?
            <br />
            다음 이용자를 위해 꼭 이용 종료 버튼을 눌러주세요.
          </div>
        </div>
      </div>

      <div className="w-full h-1 bg-neutral-200"></div>

      <div className="px-4 py-2">
        <div className="text-black/80 text-lg font-bold mb-[39px]">
          방문객 초대 가이드
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center relative">
            <div className="w-[88px] h-[88px] bg-violet-100 rounded-full flex items-center justify-center">
              <img
                src="/mypage/guide/Application.svg"
                alt="Application"
                className="w-[33px] h-[38px]"
              />
            </div>
            <div className="text-center text-indigo-800 text-base font-medium">
              사전신청
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/mypage/guide/RightArrow.svg"
              alt="RightArrow"
              className="w-6 h-6 mx-2"
            />
          </div>
          <div className="flex flex-col items-center relative">
            <div className="w-[88px] h-[88px] bg-violet-100 rounded-full flex items-center justify-center">
              <img
                src="/mypage/guide/Accept.svg"
                alt="Accept"
                className="w-[48px] h-[52px]"
              />
            </div>
            <div className="text-center text-indigo-800 text-base font-medium">승인</div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/mypage/guide/RightArrow.svg"
              alt="RightArrow"
              className="w-6 h-6 mx-2"
            />
          </div>
          <div className="flex flex-col items-center relative">
            <div className="w-[88px] h-[88px] bg-violet-100 rounded-full flex items-center justify-center">
              <img
                src="/mypage/guide/Enter.svg"
                alt="Enter"
                className="w-[40px] h-[44px]"
              />
            </div>
            <div className="text-center text-indigo-800 text-base font-medium">출입</div>
          </div>
        </div>
        <div className="p-4 bg-neutral-100 rounded-md mt-8 mb-10">
          <div className="text-neutral-700 text-sm font-semibold">Step1.</div>
          <div className="text-stone-500 text-sm">
            사전 신청을 통해 Offispace에 방문객을 초대해보세요!
          </div>
          <div className="text-neutral-700 text-sm font-semibold mt-2">Step2.</div>
          <div className="text-stone-500 text-sm">
            방문객 초대 전 각 지점의 매니저에게 방문객 명수, 방문 예정 시간을 알리고 사전
            승인을 받아야 합니다.
          </div>
          <div className="text-neutral-700 text-sm font-semibold mt-2">Step3.</div>
          <div className="text-stone-500 text-sm">
            보안을 위해 사전 승인을 받은 방문객만 출입 가능합니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
