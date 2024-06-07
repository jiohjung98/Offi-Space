/* ----- 1:1알림 MOCK DATA ----- */
export const MOCK_RESERVATION_NOTIFICATION_DATA = {
  status: 200,
  code: 'BMC002',
  message: '예약 알림 데이터 조회 성공',
  value: {
    data: [
      {
        id: 7251,
        title: '예약 안내',
        content: '12:00에 강남1호점 미니3에서 미팅이 있습니다.',
        time: '2024-06-03-12:00:00',
        type: 'warning'
      },
      {
        id: 7252,
        title: '이용 시작 30분 전',
        content: '다음 사용자를 위해 이용 시간을 준수해주세요.',
        time: '2024-06-03-12:00:00',
        type: 'check'
      },
      {
        id: 7253,
        title: '예약 안내',
        content: '12:00에 강남1호점 미니3에서 미팅이 있습니다.',
        time: '2024-06-03-12:00:00',
        type: 'warning'
      }
    ]
  }
};

/* ----- 커뮤니티 알림 MOCK DATA ----- */
export const MOCK_COMMUNITY_NOTIFICATION_DATA = {
  status: 200,
  code: 'BMC002',
  message: '커뮤니티 알림 데이터 조회 성공',
  value: {
    data: [
      {
        id: 7251,
        nickname: '닉네임_123',
        time: '2024-02-19-12:00:00'
      },
      {
        id: 7252,

        nickname: '닉네임_323',
        time: '2024-02-19-12:00:00'
      },
      {
        id: 7253,

        nickname: '닉네임_43',
        time: '2024-02-19-12:00:00'
      }
    ]
  }
};
