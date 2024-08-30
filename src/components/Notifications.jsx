import { useEffect, useRef, createContext } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notificationss from 'expo-notifications';
import Constants from 'expo-constants';
import toAMorPM from '../utils/AmPm';
import { getTranslation } from '../utils/useLenguage';
import {getSecondsUntil} from '../utils/secondsUntil'

Notificationss.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const NotificationContext = createContext()

export default function Notifications({children}) {

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()

    if (Platform.OS === 'android') {
      Notificationss.getNotificationChannelsAsync()
    }

    responseListener.current = Notificationss.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notificationss.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notificationss.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{schedulePushNotification}}>
        {children}
    </NotificationContext.Provider>
  );
}

async function schedulePushNotification(hour) {

   const seconds = (getSecondsUntil(hour, 0)/1000)

  await Notificationss.scheduleNotificationAsync({
    content: {
      title: `${getTranslation('noti', 0)} ${toAMorPM(hour)}`,
      body: getTranslation('noti', 1),
    },
    trigger: {seconds},
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notificationss.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notificationss.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notificationss.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notificationss.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notificationss.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
