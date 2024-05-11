import MainContainer from '@/components/shared/MainContainer';
import React, { Dispatch } from 'react';
import { createPortal } from 'react-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TermsModalProps {
  modalDescription: string | null;
  modalSubTitle: string | null;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}

const TermsModal = ({
  modalDescription,
  setOpenModal,
  modalSubTitle
}: TermsModalProps) => {
  console.log(modalDescription);
  const $portalRoot = document.getElementById('root-portal');

  if ($portalRoot == null) {
    return null;
  }
  if (modalDescription == null) {
    return null;
  }

  return createPortal(
    <MainContainer>
      <div className="mt-3 w-[393px] h-[72px] py-[25px] bg-white border-b-4 border-neutral-200 items-center justify-end relative">
        <div className="text-center text-black text-md font-medium font-pretendard leading-snug">
          {modalSubTitle}
        </div>
        <div
          onClick={() => {
            setOpenModal(false);
          }}
          className="w-[18px] h-[18px] absolute top-[25px] right-[16px] cursor-pointer">
          <img src="/sign/positionClose.png" alt="" className="w-full" />
        </div>
      </div>
      <div className=" max-w-[393px] mx-auto bg-white px-4 mb-8 mt-[36px]">
        <ReactMarkdown
          className="prose text-sm font-pretendard leading-[21px]"
          remarkPlugins={[remarkGfm]}>
          {modalDescription}
        </ReactMarkdown>
      </div>
    </MainContainer>,
    $portalRoot
  );
};

export default TermsModal;
