import React, { ChangeEvent, Dispatch, useState } from 'react';

const NewPasswordForm = ({
  setStep
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [validBtn, setValidBtn] = useState(false);
  const [error, setError] = useState(false);
  const [secondError, setSecondError] = useState(false);

  const handleNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    setValidBtn(
      newPasswordValue === checkPassword && newPasswordValue != '' && checkPassword != ''
    );
  };

  const handleCheckPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondError(false);
    const checkPasswordValue = e.target.value;
    setCheckPassword(checkPasswordValue);
    setValidBtn(
      newPassword === checkPasswordValue && checkPasswordValue != '' && newPassword != ''
    );
  };

  const checkValidPassword = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const checkValidNewPassword = () => {
    if (newPassword != checkPassword) {
      setSecondError(true);
    }
  };

  const handleButtonClick = () => {
    //todo : 비밀번호 변경 요청 api 필요
    setStep((prev) => prev + 1);
  };

  return (
    <>
      <div className="mt-[62px] ml-4">
        <div className="flex justify-between items-center">
          <div className="flex">
            <label
              htmlFor="password"
              className="text-neutral-600 text-base font-semibold font-pretendard">
              비밀번호
            </label>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          </div>
          {error ? (
            <div className="text-xs text-red-700 font-medium font-pretendard leading-tight">
              비밀번호 형식을 확인해주세요.
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="mt-[13px] border-b border-neutral-300">
          <div className="pb-2 flex ">
            <div className="flex-grow flex">
              <input
                id="password"
                type="password"
                className="outline-none w-full"
                placeholder="사용할 비밀번호를 입력해 주세요."
                value={newPassword}
                onChange={handleNewPassword}
                onBlur={checkValidPassword}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center  mt-2 gap-2">
          <div className="w-3.5 h-3.5 relative">
            <div className="w-3.5 h-3.5 left-0 top-0 absolute bg-slate-200 rounded-full">
              <img src="/sign/emailerror.png" alt="" />
            </div>
          </div>
          <div className="text-neutral-400 text-xs font-normal font-pretendard leading-tight">
            *영문 (대문자 포함), 숫자, 특수문자 중 2가지 이상 조합 8~16자리
          </div>
        </div>

        <div className="flex justify-between items-center mt-[36px]">
          <div className="flex">
            <label
              htmlFor="checkPassword"
              className="text-neutral-600 text-base font-semibold font-pretendard">
              비밀번호 확인
            </label>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          </div>
          {secondError ? (
            <div className="text-xs text-red-700 font-medium font-pretendard leading-tight">
              일치하지 않습니다.
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="mt-[13px] border-b border-neutral-300">
          <div className="pb-2 flex">
            <div className="flex-grow flex">
              <input
                type="password"
                className="outline-none w-full"
                placeholder="위와 같은 비밀번호를 입력해 주세요."
                id="checkPassword"
                value={checkPassword}
                onChange={handleCheckPassword}
                onBlur={checkValidNewPassword}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mx-auto mb-4">
        <button
          disabled={!validBtn}
          className={`mt-[250px] w-[361px] h-12 px-3.5 rounded-lg  justify-center items-center inline-flex text-[15px] font-semibold font-pretendard leading-snug
     ${!validBtn ? 'border border-black text-black bg-white' : 'bg-space-purple text-white'}
     `}
          type="submit"
          onClick={handleButtonClick}>
          다음
        </button>
      </div>
    </>
  );
};

export default NewPasswordForm;
