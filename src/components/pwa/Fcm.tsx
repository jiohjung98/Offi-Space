import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID
};

const app = initializeApp(firebaseConfig);

/**
 * FCM 토큰 발급
 */
export const setTokenHandler = async () => {
  const messaging = getMessaging(app);
  await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY
  })
    .then(async (currentToken) => {
      if (!currentToken) {
        // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
      } else {
        // 토큰을 받았다면 여기서 DB에 저장하면 됩니다.
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

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

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY;

export const getTokenHandler = async () => {
  const messaging = getMessaging(app);
  return await getToken(messaging, {
    vapidKey: VAPID_KEY
  })
    .then(async (currentToken) => {
      if (!currentToken) {
        // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
        console.error('토큰 생성 불가');
      } else {
        // 토큰을 받았다면 여기서 supabase 테이블의 저장하면 됩니다.
        console.log('currentToken', currentToken);
        return currentToken;
      }
    })
    .catch((error) => {
      console.error('token error', error);
    });
};
