const CalculateTime = (timeStr: string) => {
  const now = new Date();

  // 입력받은 시간 문자열을 Date 객체로 변환
  const pastTime = new Date(timeStr);

  // 두 시간의 차이를 계산
  const diff = now.getTime() - pastTime.getTime();

  // 초 단위의 차이 계산
  let secondsDiff = Math.floor(diff / 1000);

  // 각 단위로 변환
  const months = Math.floor(secondsDiff / (30 * 24 * 3600));
  secondsDiff %= 30 * 24 * 3600;

  const days = Math.floor(secondsDiff / (24 * 3600));
  secondsDiff %= 24 * 3600;

  const hours = Math.floor(secondsDiff / 3600);
  secondsDiff %= 3600;

  const minutes = Math.floor(secondsDiff / 60);
  const seconds = secondsDiff % 60;

  // 조건에 맞게 결과를 문자열로 반환
  if (months > 0) {
    return `${months}개월 전`;
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else if (seconds > 0) {
    return `${seconds}초 전`;
  } else {
    return '방금 전';
  }
};

export default CalculateTime;
