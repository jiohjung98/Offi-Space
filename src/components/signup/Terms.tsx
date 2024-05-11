import React, { MouseEvent, useState } from 'react';
import TermsTitle from './terms/TermsTitle';
import { 약관목록 } from '@constant/temrs';
import { TermsType } from '@/models/terms';
import TermsItem from './terms/TermsItem';
import dynamic from 'next/dynamic';

const TermsModal = dynamic(() => import('./terms/TermsModal'), {
  ssr: false
});

const Terms = () => {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    setInitialValues(약관목록)
  );
  const [openModal, setOpenModal] = useState(false);
  const [modalDescription, setModalDescription] = useState<string | null>(null);
  const [modalSubTitle, setModalSubTitle] = useState<string | null>(null);

  const handleAgreement = (id: number, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) => (term.id === id ? { ...term, checked } : term));
    });
  };

  const handleAllTerms = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) => ({ ...term, checked }));
    });
  };

  const isAllRequireChecked = termsAgreements
    .filter((term) => term.required)
    .every((term) => term.checked);

  console.log(isAllRequireChecked);
  //todo : isAllRequireChecked을 넘겨서 true 여야지만 회원가입 이뤄지게 (버튼 눌러지게)

  const isAllTermsChecked = termsAgreements.every((term) => term.checked);

  if (openModal) {
    return (
      <TermsModal
        setOpenModal={setOpenModal}
        modalDescription={modalDescription}
        modalSubTitle={modalSubTitle}
      />
    );
  }

  return (
    <div className="w-[361px] h-[190px] bg-stone-50 rounded-lg mx-auto">
      <TermsTitle checked={isAllTermsChecked} onChange={handleAllTerms} />
      <ul className="flex flex-col justify-center items-center gap-[12px] mt-[24px]">
        {termsAgreements.map((term) => (
          <TermsItem
            checked={term.checked}
            title={term.title}
            subTitle={term.subTitle}
            setModalSubTitle={setModalSubTitle}
            description={term.description}
            setOpenModal={setOpenModal}
            setModalDescription={setModalDescription}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          />
        ))}
      </ul>
    </div>
  );
};

function setInitialValues(terms: TermsType[]) {
  return terms.map((term) => ({ ...term, checked: false }));
}

export default Terms;
