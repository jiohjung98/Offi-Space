importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDMudivNtvPkjrfqBc9UIApDQqIdQ36qfk',
  authDomain: 'sabujak-56c99.firebaseapp.com',
  projectId: 'sabujak-56c99',
  storageBucket: 'sabujak-56c99.appspot.com',
  messagingSenderId: '791652948273',
  appId: '1:791652948273:web:7899ddf709d181bca2b810'
});

// 푸시 내용을 처리해서 알림으로 띄운다.
self.addEventListener('push', function (event) {
  if (event.data) {
    // 알림 메세지일 경우엔 event.data.json().notification;
    const url = event.data.json().data;
    const data = event.data.json().notification;
    const options = {
      body: data.body,
      icon: data.image,
      image: data.image,
      data: {
        click_action: data.click_action,
        targetUrl: url.targetUrl
      }
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log('This push event has no data.');
  }
});

// 알림을 클릭하면 사이트로 이동한다.
self.addEventListener('notificationclick', function (event) {
  event.preventDefault();
  event.notification.close();
  const urlToOpen = event.notification.data.targetUrl;

  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
