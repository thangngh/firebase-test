import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCLg7SlPiPg4IYRdvZd5OuDvl2hXgTVums',
    authDomain: 'app-911-eab68.firebaseapp.com',
    projectId: 'app-911-eab68',
    storageBucket: 'app-911-eab68.appspot.com',
    messagingSenderId: '84811442284',
    appId: '1:84811442284:web:a2e4b104144fceeb475049',
    measurementId: 'G-6P31MMKW4E',
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
    return getToken(messaging, {
        vapidKey:
            'BA0we3fUyHeQeB5YJjviD8MZEFwcd2dWQdONnUsqpVF6W8adv4hyLUzUEeA2CyWkfRbwlbhAd1bKp7qT5coODG8',
    })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                // Perform any other neccessary action with the token
                return currentToken;
            } else {
                // Show permission request UI
                console.log(
                    'No registration token available. Request permission to generate one.',
                );
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
