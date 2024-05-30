export const clickPushHandler = () => {
  Notification.requestPermission().then((permission) => {
    if (permission !== 'granted') {
      // 푸시 거부됐을 때 처리할 내용
      console.log('푸시 거부됨');
    } else {
      // 푸시 승인됐을 때 처리할 내용
      console.log('푸시 승인됨');
    }
  });
};
