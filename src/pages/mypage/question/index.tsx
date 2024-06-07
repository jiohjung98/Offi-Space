import { questiongetmock, questionpostmock } from '@/api/mock.api';
import { BackArrow } from '@/components/backarrow/BackArrow';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const InquiryForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isButtonActive = title && content;

  const handleSubmit = () => {
    if (isButtonActive) {
      questionpostmock({ title, content });
      setTitle('');
      setContent('');
      alert('문의등록이 완료되었습니다!');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex items-center mb-4">
        <img className=" w-5 h-5" src="/mypage/inquiry/Map.svg" alt="map" />
        {/* api */}
        <div className="text-black text-base font-medium">강남1호점</div>
      </div>
      <div className="border-b border-neutral-200 py-4">
        <div className="text-lg font-bold text-black">제목</div>
        <input
          className="w-full  mt-2 text-neutral-400 text-base font-medium focus:outline-none"
          type="text"
          placeholder="제목을 입력하세요. (최대 20자)"
          maxLength={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="py-4">
        <div className="text-lg font-bold text-black">내용</div>
        <textarea
          className="w-full mt-2 h-[400px] text-neutral-400 text-base font-medium focus:outline-none"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mt-6">
        <button
          className={`w-full py-3 rounded-lg text-base font-medium ${isButtonActive ? 'bg-indigo-700 text-white' : 'border border-neutral-300 text-zinc-400'}`}
          onClick={handleSubmit}>
          등록
        </button>
      </div>
    </div>
  );
};

const InquiryHistory = () => {
  const [openInquiry, setOpenInquiry] = useState<number | null>(null);
  const toggleInquiry = (index: number): void => {
    setOpenInquiry(openInquiry === index ? null : index);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['inquiries'],
    queryFn: questiongetmock
  });
  const inquiriesData = data?.data.value.data;
  console.log(data?.data.value.data);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        inquiriesData?.length === 0 && (
          <div className=" w-full h-[400px] flex flex-col justify-center items-center">
            <img className="mb-[16px]" src="/mypage/inquiry/Warning.svg" />
            <div className="text-neutral-400 text-base font-normal font-['Pretendard'] leading-snug">
              문의 내역이 없습니다.
            </div>
          </div>
        )
      )}

      {inquiriesData?.map((data: { title: string; content: string }, index: number) => (
        <div
          key={index}
          className="border-b border-neutral-300 py-4 cursor-pointer"
          onClick={() => toggleInquiry(index)}>
          <div className="flex justify-between items-center">
            <div className="text-base font-medium text-black">{data.title}</div>
            <img
              className="w-2.5 h-5"
              src={
                openInquiry === index
                  ? '/mypage/notice/UpArrow.svg'
                  : '/mypage/notice/DownArrow.svg'
              }
              alt="arrow"
            />
          </div>
          <div className="text-sm font-normal text-neutral-400 mt-2">2024.05.16</div>
          {openInquiry === index && (
            <div className="text-neutral-400 text-sm font-medium leading-tight py-2">
              {data.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const InquiryPage = () => {
  const [view, setView] = useState('inquiry');
  // const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // const handleInquirySubmit = (inquiry: Inquiry) => {
  //   setInquiries([...inquiries, inquiry]);
  // };

  return (
    <div className=" max-w-[393px]  mx-auto relative">
      <div className="mt-[20px] ml-[10px] ">
        <BackArrow width="40px" height="24px" name="1:1 문의" link="/mypage" />
      </div>
      <div className="w-full h-[900px] bg-white flex flex-col justify-between items-center">
        <div className="w-full flex justify-center items-center border-b border-neutral-200 mt-[13px]">
          <button
            className={`px-6 py-2 ${view === 'inquiry' ? 'border-b-2 border-indigo-700 text-indigo-700 font-bold' : 'text-neutral-700 font-normal'}`}
            onClick={() => setView('inquiry')}>
            문의하기
          </button>
          <button
            className={`px-6 py-2 ${view === 'history' ? 'border-b-2 border-indigo-700 text-indigo-700 font-bold' : 'text-neutral-700 font-normal'}`}
            onClick={() => setView('history')}>
            문의내역
          </button>
        </div>

        <div className="w-full flex-1 overflow-y-auto">
          {view === 'inquiry' ? <InquiryForm /> : <InquiryHistory />}
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
