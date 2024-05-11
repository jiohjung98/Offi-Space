import React, { useState } from 'react';
import ToBack from '../shared/sign/ToBack';
import { motion } from 'framer-motion';
import Image from 'next/image';
import JobPosition from './JobPosition';

const PasswordVerification = ({ userName, userEmail }: { userName: string; userEmail: string; }) => {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showJobPosition, setShowJobPosition] = useState(false);

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
                                    <button
                                        className='w-[83px] h-[31px] px-3.5 py-1.5 mb-1 rounded border justify-center items-center gap-2.5 flex text-center text-sm font-medium font-pretendard'
                                        disabled>
                                        인증 완료
                                    </button>
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
                        <div className='mt-[15px] ml-4 flex'>
                            <Image
                                src="/ExclamationMark.svg"
                                alt="ExclamationMark Logo"
                                className='mb-auto'
                                width={14}
                                height={14} />
                            <div className="ml-[8px] text-zinc-400 text-xs font-normal font-['Pretendard'] leading-tight">*영문 (대문자 포함), 숫자, 특수문자 중 2가지 이상 조합 8~16자리</div>
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
                                        placeholder="직무를 목록에서 선택해주세요."
                                        readOnly
                                    />
                                </div>
                                <Image src="/DropDown.svg"
                                    alt="ExclamationMark Logo"
                                    className='mr-[10px]'
                                    width={14}
                                    height={7} />

                            </div>
                        </div>
                    </motion.div></>
            )}
            {showJobPosition && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <JobPosition />
                </motion.div>
            )}
        </div>
    );
};

export default PasswordVerification;