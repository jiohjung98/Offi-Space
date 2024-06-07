import { del } from '@/api/auth/auth.delete.api';
import { BackArrow } from '@/components/backarrow/BackArrow';
import MainContainer from '@/components/shared/MainContainer';
import { useState } from 'react';

const MemberWithdrawal = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };
  const handleWithdrawal = () => {
    del();
    alert('회원탈퇴가 완료되었습니다.');
  };
  return (
    <MainContainer>
      <div className="mt-[20px] ml-[10px] ">
        <BackArrow width="40px" height="24px" name="회원 탈퇴" />
      </div>
      <div className="w-full h-screen bg-white flex flex-col items-center">
        <div className="flex flex-col p-[16px] items-start mt-3">
          <div className="text-2xl font-semibold mb-[56px] ">
            떠나시게 되어 아쉬워요.
            <br />
            유의 사항을 확인해주세요.
          </div>

          <div className="w-12/13 mt-4 border border-neutral-200 p-4">
            <div className="mt-2[14px] text-lg font-bold text-indigo-700">
              회원 탈퇴 시 유의 사항
            </div>

            <div className="w-[330px] h-[1px] mt-[8px] mb-[23px] bg-gray-300" />
            <div className="text-sm text-stone-500 leading-relaxed">
              ・회원 탈퇴 시 개인정보는 삭제되고 복구되지 않습니다.
              <br />
              ・동일 이메일로 재가입 시 인증 절차를 다시 진행해야 합니다.
              <br />
              ・커뮤니티 내에 작성하셨던 글과 댓글은 삭제할 수 없습니다. (추후 동일
              이메일로 재가입 시에도 삭제 불가능)
              <br />
              ・예약된 내역은 모두 예약 취소 처리됩니다. (참여자일 경우 참여자에서만 제외)
            </div>
          </div>

          <div className="flex flex-row items-center justify-center mt-10 ml-8">
            <input
              type="checkbox"
              id="agreement"
              className="w-5 h-5 border border-neutral-600"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="agreement"
              className="ml-3 text-sm text-stone-500 flex justify-center">
              안내 사항을 모두 확인하였으며, 이에 동의합니다.
            </label>
          </div>

          <button
            onClick={handleWithdrawal}
            className={`w-full mt-20 py-3 rounded-lg text-white font-semibold  flex justify-center  ${isChecked ? 'bg-space-purple' : 'bg-gray-400'} `}
            disabled={!isChecked}>
            회원탈퇴
          </button>
        </div>
      </div>
    </MainContainer>
  );
};

export default MemberWithdrawal;
