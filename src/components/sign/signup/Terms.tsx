import React, { Dispatch, MouseEvent, useEffect, useState } from 'react';
import TermsTitle from './terms/TermsTitle';
import { 약관목록 } from '@constant/temrs';
import { TermsType } from '@/models/terms';
import TermsItem from './terms/TermsItem';
import dynamic from 'next/dynamic';

const TermsModal = dynamic(() => import('./terms/TermsModal'), {
  ssr: false
});

interface TermsProps {
  setIsSmsAgree: Dispatch<React.SetStateAction<boolean>>;
  setIsAllAgreeChecked: Dispatch<React.SetStateAction<boolean>>;
}

const Terms = ({ setIsSmsAgree, setIsAllAgreeChecked }: TermsProps) => {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    setInitialValues(약관목록)
  );
  const [openModal, setOpenModal] = useState(false);
  const [modalDescription, setModalDescription] = useState<string | null>(null);
  const [modalSubTitle, setModalSubTitle] = useState<string | null>(null);

  useEffect(() => {
    const isAllRequireChecked = termsAgreements
      .filter((term) => term.required)
      .every((term) => term.checked);
    if (isAllRequireChecked) {
      setIsAllAgreeChecked(true);
    } else {
      setIsAllAgreeChecked(false);
    }
  }, [termsAgreements, setIsAllAgreeChecked]);

  useEffect(() => {
    const isSmsChecked = termsAgreements
      .filter((term) => term.required == false)
      .every((term) => term.checked);
    if (isSmsChecked) {
      setIsSmsAgree(true);
    } else {
      setIsSmsAgree(false);
    }
  }, [termsAgreements, setIsSmsAgree]);

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
    <div className="w-[361px] h-[190px] bg-stone-50 rounded-lg mx-auto mt-[55px]">
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
