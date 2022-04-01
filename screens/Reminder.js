import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, TextInput,StyleSheet } from 'react-native';
import { Chip, Title } from 'react-native-paper';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Reminder() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [reminder, setInputreminder] = useState(1);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            console.log('This will run every second!',reminder);
            await schedulePushNotification()
        },reminder*60000);
        return () => clearInterval(interval);
    }, []);
    return (
        <View
            style={{
                flex: 1,
               margin:25
            }}>
            <View >
            <Title style={{ color: "#000", textAlign: "center", marginTop: 10 }}>Enter Reminder time</Title>

            <TextInput
                style={styles.input}
                onChangeText={text => setInputreminder(text)}
                // value={reminder}
                placeholder="Enter Minutes"
                keyboardType="numeric"
            />
            <Button
                title="Set Reminder"
                style={{borderRadius:5}}
                mode="contained" color="#fb8c00" borderRadius={5}
                onPress={ () => {
                    // await schedulePushNotification();
                    console.log(reminder)
                }}
            />
            </View>
            <View marginTop={15}>

            <Button
                title="Reset Reminder"
                mode="contained" color="#fb8c00"
                onPress={ () => {
                    // await schedulePushNotification();
                    setInputreminder(2)
                }}
            />
            <Chip
              mode='outlined'
              icon='information'
              selectedColor='#ffa726'
              backgroundColor='#000'
              style={{ marginTop: 10, marginBottom: 5, backgroundColor: "#000", textAlign: 'center', justifyContent: 'center' }}
            >
              2 minutes reminder by default
            </Chip>

            </View>
        </View>
    );
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Water Reminder!!",
            body: 'Hey It is time to drink water',
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: '#000',
        borderRadius:5,
        borderWidth: 1,
        margin:15,
        padding:5
    },
  });