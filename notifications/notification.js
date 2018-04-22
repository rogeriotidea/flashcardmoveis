import {AsyncStorage} from 'react-native'
import {Permissions, Notifications} from 'expo'

export const NOTIFICATION_KEY = "UDACITY_FLASHCARDS"

function criarNotificacao () {
    return {
        title: 'Estude hoje !',
        body: "Voce precisa ao menos reponder a um quiz hoje !",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            sticky: false,
            vibrate: true,
            priority: 'high',
        }
    }
}

export function setarNotificacao () {

    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
          if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({ status }) => {
                   if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(20);
                            tomorrow.setMinutes(0);
                            Notifications.scheduleLocalNotificationAsync(
                                criarNotificacao(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            );
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                   }
               })
            }
        })
}

export function limparNotificacoes () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}