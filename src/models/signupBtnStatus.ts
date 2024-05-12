// 처음 진입 했을 때 first, 번호가 정상적으로 입력됐을때 second, 인증요청을 눌렀을 때 third

const status = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD'
};

export type SignupBtnStatus = keyof typeof status;
