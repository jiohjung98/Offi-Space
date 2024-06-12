/* eslint-disable react/jsx-pascal-case */
import MainContainer from '@/components/shared/MainContainer';
import SEO from '@/components/shared/SEO';
import { BackArrow } from '@/components/sign/backarrow/BackArrow';
import React, { useState } from 'react';

const NoticePage = () => {
  const [openNotice, setOpenNotice] = useState<string | null>(null);

  const toggleNotice = (notice: string | null) => {
    setOpenNotice(openNotice === notice ? null : notice);
  };

  return (
    <>
      <SEO title="Offispace | 공지사항" />
      <MainContainer>
        <div className="mt-[40px] ml-[10px] mb-[22px]">
          <BackArrow width="40px" height="24px" name="공지사항" />
        </div>

        <div className="w-full  flex items-center justify-center mt-3">
          <div className="w-full  flex flex-col justify-center items-center">
            <div className="w-full flex-1 flex flex-col items-center overflow-y-auto">
              <div
                className="w-[361px] border-t  border-neutral-300 py-3"
                onClick={() => toggleNotice('notice')}>
                <div className="flex justify-between items-center">
                  <div className="text-black/opacity-20 text-sm font-semibold leading-[21px] tracking-tight">
                    [안내] 5/20 (월) 02~03 커뮤니티 서비스 점검
                  </div>
                  <img
                    className="w-[23px] h-[34px] mr-[6px] cursor-pointer "
                    src={
                      openNotice === 'notice'
                        ? '/mypage/notice/UpArrow.svg'
                        : '/mypage/notice/DownArrow.svg'
                    }
                    alt="arrow"
                  />
                </div>
                <div className="text-zinc-400 text-xs font-normal tracking-tight">
                  2024. 05. 18
                </div>
              </div>
              {openNotice === 'notice' && (
                <div className="w-[361px] text-neutral-400 text-sm font-medium px-[12px] border-t leading-tight py-3 bg-stone-50  border-neutral-300">
                  안녕하세요.
                  <br />
                  Offispace 커뮤니티 서비스팀입니다.
                  <br />
                  <br />
                  5월 20일 (월요일) 새벽 2시부터 3시까지 (총 1시간 예상)
                  <br />
                  전체 커뮤니티 서비스 점검이 진행됩니다.
                  <br />
                  <br />
                  점검이 진행되는 동안에도 게시글/댓글 쓰기, 읽기 등 대부분의 기능을
                  이용하실 수 있으나, 좋아요, 조회수 정보 미반영, 댓글 삭제 등 일부 기능에
                  영향이 있을 수 있습니다.
                  <br />
                  <br />
                  서비스 이용에 불편 을 드릴 수 있는 점 미리 양해 부탁드리며,
                  <br />
                  최대한 빠른 시간 내에 업데이트를 완료하고 더욱 안정적인 서비스로 찾아
                  뵙겠습니다.
                  <br />
                  <br />
                  감사합니다.
                </div>
              )}

              <div
                className="w-[361px] border-t  border-neutral-300 py-3"
                onClick={() => toggleNotice('update1')}>
                <div className="flex justify-between items-center">
                  <div className="text-black/opacity-20 text-sm font-semibold leading-[21px] tracking-tight">
                    [업데이트 내역] 1.0.3 업데이트
                  </div>
                  <img
                    className="w-[23px] h-[34px] mr-[6px] cursor-pointer"
                    src={
                      openNotice === 'update1'
                        ? '/mypage/notice/UpArrow.svg'
                        : '/mypage/notice/DownArrow.svg'
                    }
                    alt="arrow"
                  />
                </div>
                <div className="text-zinc-400 text-xs font-normal tracking-tight">
                  2024. 05. 15
                </div>
              </div>
              {openNotice === 'update1' && (
                <div className="w-[361px] text-neutral-400 text-sm font-medium px-[12px] border-t leading-tight py-3 bg-stone-50  border-neutral-300">
                  안녕하세요.
                  <br />
                  Offispace 서비스팀입니다.
                  <br />
                  5월 2일 이루어진 1.0.3 업데이트 사항을 알려드립니다.
                  <br />
                  <br />
                  1. 알림 센터
                  <br />
                  알림센터에서 예약과 관련된 푸시를 확인해보세요.
                  <br />
                  <br />
                  2. 이용자 가이드
                  <br />
                  Offispace 이용에 꼭 필요한 정보를 확인해보세요.
                  <br />
                  <br />
                  감사합니다.
                </div>
              )}

              <div
                className="w-[361px] border-t border-b border-neutral-300 py-3"
                onClick={() => toggleNotice('update2')}>
                <div className="flex justify-between items-center">
                  <div className="text-black/opacity-20 text-sm font-semibold leading-[21px] tracking-tight">
                    [업데이트 내역] 1.0.2 업데이트
                  </div>
                  <img
                    className="w-[23px] h-[34px] mr-[6px] cursor-pointer"
                    src={
                      openNotice === 'update2'
                        ? '/mypage/notice/UpArrow.svg'
                        : '/mypage/notice/DownArrow.svg'
                    }
                    alt="arrow"
                  />
                </div>
                <div className="text-zinc-400 text-xs font-normal tracking-tight">
                  2024. 04. 12
                </div>
              </div>
              {openNotice === 'update2' && (
                <div className="w-[361px] text-neutral-400 text-sm font-medium px-[12px] leading-tight py-3 bg-stone-50  border-b border-neutral-300">
                  안녕하세요.
                  <br />
                  Offispace 서비스팀입니다.
                  <br />
                  <br />
                  4월 12일 앱 사용성 개선 및 버그 수정을 위해 1.0.2 업데이트가 있었습니다.
                  <br />
                  <br />
                  감사합니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default NoticePage;
