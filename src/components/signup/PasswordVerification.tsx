/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import { motion } from 'framer-motion';
import Image from 'next/image';
import JobPosition from './JobPosition';

const PasswordVerification = ({ userName, userEmail }: { userName: string; userEmail: string; }) => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showJobPosition, setShowJobPosition] = useState(false);
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [allAgreed, setAllAgreed] = useState(false);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
    const [termsCheckIcon, setTermsCheckIcon] = useState(false);
    const [serviceTermsCheckIcon, setServiceTermsCheckIcon] = useState(false);
    const [privacyTermsCheckIcon, setPrivacyTermsCheckIcon] = useState(false);
    const [marketingTermsCheckIcon, setMarketingTermsCheckIcon] = useState(false);

    useEffect(() => {
        checkFormValidity();
    }, [passwordError, selectedJob, allAgreed, termsCheckIcon, serviceTermsCheckIcon, privacyTermsCheckIcon, marketingTermsCheckIcon]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const validatePassword = (value: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        if (!regex.test(value)) {
            setPasswordError('패스워드를 다시 정해주세요.');
        } else {
            setPasswordError('');
        }
    };

    const handleJobPositionClick = () => {
        setShowJobPosition(true);
    };

    const checkFormValidity = () => {
        if (passwordError === '' && selectedJob && serviceTermsCheckIcon && privacyTermsCheckIcon) {
            setNextButtonDisabled(false);
        } else {
            setNextButtonDisabled(true);
        }
    };

    const handleServiceTermsCheck = () => {
        const newServiceTermsCheckIcon = !serviceTermsCheckIcon;
        setServiceTermsCheckIcon(newServiceTermsCheckIcon);
        updateAllAgreedIcon();
        if (newServiceTermsCheckIcon && privacyTermsCheckIcon && marketingTermsCheckIcon) {
            setAllAgreed(true);
        }
        else {
            setAllAgreed(false);
        }
    };
    
    const handlePrivacyTermsCheck = () => {
        const newPrivacyTermsCheckIcon = !privacyTermsCheckIcon;
        setPrivacyTermsCheckIcon(newPrivacyTermsCheckIcon);
        updateAllAgreedIcon();
        if (serviceTermsCheckIcon && newPrivacyTermsCheckIcon && marketingTermsCheckIcon) {
            setAllAgreed(true);
        }
        else {
            setAllAgreed(false);
        }
    };
    
    const handleMarketingTermsCheck = () => {
        const newMarketingTermsCheckIcon = !marketingTermsCheckIcon;
        setMarketingTermsCheckIcon(newMarketingTermsCheckIcon);
        updateAllAgreedIcon();
        if (serviceTermsCheckIcon && privacyTermsCheckIcon && newMarketingTermsCheckIcon) {
            setAllAgreed(true);
        }
        else {
            setAllAgreed(false);
        }
    };
    
    const updateAllAgreedIcon = () => {
        if (allAgreed) {
            setTermsCheckIcon(true);
        } else {
            setTermsCheckIcon(false);
        }
    };

    const handleAllAgreed = () => {
        const newAllAgreed = !allAgreed;
        setAllAgreed(newAllAgreed);
        setServiceTermsCheckIcon(newAllAgreed);
        setPrivacyTermsCheckIcon(newAllAgreed);
        setMarketingTermsCheckIcon(newAllAgreed);
        checkFormValidity();
    };

    const handleNextButtonClick = () => {
        // todo
    };

    return (
        <div className="max-w-[360px] mx-auto">
            {!showJobPosition && (
                <><ToBack /><motion.div
                    initial={{ opacity: 0, translateX: -90 }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                        delay: 0.3
                    }}
                    animate={{
                        opacity: 1,
                        translateX: 0
                    }}>
                    <div className="text-black text-[22px] font-semibold font-pretendard leading-[30.80px] mt-[24px] ml-4">
                        회원가입을 위한<br />정보를 입력해주세요.
                    </div>
                </motion.div><motion.div
                    initial={{ opacity: 0, translateX: -90 }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                        delay: 0.6
                    }}
                    animate={{
                        opacity: 1,
                        translateX: 0
                    }}>
                        <div className="mt-[62px] ml-4 border-b border-neutral-300">
                            <div className="flex">
                                <label
                                    htmlFor="name"
                                    className="text-neutral-600 text-base font-semibold font-pretendard">
                                    이름
                                </label>
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
                            </div>
                            <div className="mt-[13px] flex">
                                <div className="flex-grow flex items-center">
                                    <input
                                        id="name"
                                        type="text"
                                        className="outline-none w-full"
                                        value={userName} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-[37px] ml-4 border-b border-neutral-300">
                            <div className="flex items-center">
                                <div className="flex">
                                    <label
                                        htmlFor="email"
                                        className="text-neutral-600 text-base font-semibold font-pretendard">
                                        이메일
                                    </label>
                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
                                </div>
                            </div>
                            <div className="mt-[13px] flex">
                                <div className="flex-grow flex items-center">
                                    <input
                                        id="email"
                                        type="email"
                                        className="outline-none w-full"
                                        value={userEmail} />
                                </div>
                                <div className="flex items-center ml-4">
                                    <div className="w-[83px] h-[31px] px-3.5 py-1.5 mb-1 bg-white rounded border border-neutral-300 justify-center items-center gap-2.5 inline-flex">
                                        <div className="text-center text-zinc-400 text-sm font-light font-['Pretendard']">확인완료</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-[15px] ml-4 flex'>
                            <Image
                                src="/ExclamationMark.svg"
                                alt="ExclamationMark Logo"
                                className='mb-auto'
                                width={14}
                                height={14} />
                            <div className="ml-[8px] text-zinc-400 text-xs font-normal font-['Pretendard'] leading-tight">본인 인증, 예약 확인, 약관 변경 안내 등을 위해 사용됩니다.<br />사내 이메일로 정확하게 입력해주세요.</div>
                        </div>
                        <div className="mt-[29px] ml-4 border-b border-neutral-300">
                            <div className="flex">
                                <label
                                    htmlFor="password"
                                    className="text-neutral-600 text-base font-semibold font-pretendard">
                                    비밀번호
                                </label>
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
                                {passwordError && (
                                    <div className="text-red-700 font-semibold font-pretendard text-xs ml-auto">
                                        {passwordError}
                                    </div>
                                )}
                            </div>
                            <div className="mt-[13px] flex">
                                <div className="flex-grow flex items-center">
                                    <input
                                        id="password"
                                        type="password"
                                        className="outline-none w-full"
                                        placeholder="비밀번호를 입력해주세요."
                                        value={password}
                                        onChange={handlePasswordChange} />
                                </div>
                            </div>
                        </div>
                        <div className='mt-[15px] ml-4 flex'>
                            <Image
                                src="/ExclamationMark.svg"
                                alt="ExclamationMark Logo"
                                className='mb-auto'
                                width={14}
                                height={14} />
                            <div className="ml-[8px] text-zinc-400 text-xs font-normal font-['Pretendard'] leading-tight">*영문 (대문자 포함), 숫자, 특수문자 중 2가지 이상 조합 8~16자리</div>
                        </div>
                        <div className="mt-[29px] ml-4 border-b border-neutral-300">
                            <div className="flex">
                                <label
                                    htmlFor="job"
                                    className="text-neutral-600 text-base font-semibold font-pretendard">
                                    직무
                                </label>
                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full ml-[4px]" />
                            </div>
                            <div className="mt-[13px] flex" onClick={handleJobPositionClick}>
                                <div className="flex-grow flex items-center">
                                    <input
                                        id="job"
                                        type="text"
                                        className="outline-none w-full cursor-pointer"
                                        placeholder={selectedJob ? selectedJob : "직무를 목록에서 선택해주세요."}
                                        readOnly
                                    />
                                </div>
                                <Image src="/DropDown.svg"
                                    alt="DropDown Logo"
                                    className='mr-[10px]'
                                    width={14}
                                    height={7} />
                            </div>
                        </div>
                        <div className="h-[181px] bg-stone-50 rounded-lg ml-4 mt-[55px]">
                            {allAgreed ? (
                                <button onClick={handleAllAgreed} className="w-full h-12 bg-white rounded-lg border border-indigo-700 flex items-center">
                                    <Image src="/CheckedIcon.svg" alt="CheckIcon" className="ml-[17px]" width={12} height={10} />
                                    <div className="text-indigo-600 text-sm font-semibold font-['Pretendard'] leading-[21px] ml-[10px]">모두 동의합니다</div>
                                </button>
                            ) : (
                                <button onClick={handleAllAgreed} className="w-full h-12 bg-white rounded-lg border border-neutral-300 flex items-center">
                                    <Image src="/CheckIcon.svg" alt="CheckIcon Logo" className="ml-[17px]" width={12} height={10} />
                                    <div className="text-neutral-700 text-sm font-semibold font-['Pretendard'] leading-[21px] ml-[10px]">모두 동의합니다</div>
                                </button>
                            )}

                            <button onClick={handleServiceTermsCheck} className="w-[328px] h-[21px] items-center inline-flex mt-[24px]">
                                {serviceTermsCheckIcon ? (
                                    <Image src="/CheckedIcon.svg" alt="CheckIcon" className="ml-[17px]" width={12} height={10} />
                                ) : (
                                    <Image src="/CheckSubIcon.svg" alt="CheckSubIcon Logo" className="ml-[17px]" width={12} height={10} />
                                )}
                                <div className="w-full justify-start items-center flex justify-between">
                                    <div className="text-stone-500 text-sm font-normal font-['Pretendard'] leading-[21px] ml-[10px]">(필수) 서비스 이용약관 동의</div>
                                    <Image src="/RightArrowIcon.svg" alt="RightArrowIcon Logo" width={6} height={12} />
                                </div>
                            </button>
                            <button onClick={handlePrivacyTermsCheck} className="w-[328px] h-[21px] items-center inline-flex mt-[12px]">
                                {privacyTermsCheckIcon ? (
                                    <Image src="/CheckedIcon.svg" alt="CheckIcon" className="ml-[17px]" width={12} height={10} />
                                ) : (
                                    <Image src="/CheckSubIcon.svg" alt="CheckSubIcon Logo" className="ml-[17px]" width={12} height={10} />
                                )}
                                <div className="w-full justify-start items-center flex justify-between">
                                    <div className="text-stone-500 text-sm font-normal font-['Pretendard'] leading-[21px] ml-[10px]">(필수) 개인정보 수집 및 이용동의</div>
                                    <Image src="/RightArrowIcon.svg" alt="RightArrowIcon Logo" width={6} height={12} />
                                </div>
                            </button>
                            <button onClick={handleMarketingTermsCheck} className="w-[328px] h-[21px] items-center inline-flex mt-[12px]">
                                {marketingTermsCheckIcon ? (
                                    <Image src="/CheckedIcon.svg" alt="CheckIcon" className="ml-[17px]" width={12} height={10} />
                                ) : (
                                    <Image src="/CheckSubIcon.svg" alt="CheckSubIcon Logo" className="ml-[17px]" width={12} height={10} />
                                )}
                                <div className="w-full justify-start items-center flex justify-between">
                                    <div className="text-stone-500 text-sm font-normal font-['Pretendard'] leading-[21px] ml-[10px]">(선택) 마케팅 정보 수집 및 이용 동의</div>
                                    <Image src="/RightArrowIcon.svg" alt="RightArrowIcon Logo" width={6} height={12} />
                                </div>
                            </button>
                            <button className={`w-full h-12 mt-[32px] mb-[48px] rounded-lg border border-neutral-300 ${nextButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer bg-indigo-700 text-white'}`} onClick={handleNextButtonClick} disabled={nextButtonDisabled}>
                                <div className={`text-center text-[15px] font-normal font-['Pretendard'] leading-snug ${nextButtonDisabled ? 'text-zinc-400' : 'text-white'}`}>다음</div>
                            </button>

                        </div>
                    </motion.div></>
            )}
            {showJobPosition && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    <JobPosition setSelectedJob={setSelectedJob} setShowJobPosition={setShowJobPosition} />
                </motion.div>
            )}
        </div>
    );
};

export default PasswordVerification;