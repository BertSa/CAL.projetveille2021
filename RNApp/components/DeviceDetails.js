import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subscribeToTopic, unsubscribeToTopic } from '../core/EnvironmentConstants';
import { Switch, Text } from 'react-native';

export function DeviceDetails( {route} ) {
    const [ device, setDevice ] = useState(null);
    const [ topicSubscribed, setTopicSubscribed ] = useState(false);
    const {deviceId} = route.params;
    useEffect(() => {
        database()
            .ref(`/devices/${ deviceId }`)
            .on('value', async ( snapshot ) => {
                const data = snapshot.val();
                setDevice(data);
                getData(data.topic).then();
            });
        return () => {
            database()
                .ref(`/devices/${ deviceId }`)
                .off('value');

        };
    }, []);

    const storeData = async ( topic, value : boolean ) => {
        if (!topic) {
            return;
        }
        try {
            await AsyncStorage.setItem('topic@' + topic, value.toString());
            setTopicSubscribed(value);
            if (value) {
                subscribeToTopic(topic);
            } else {
                unsubscribeToTopic(topic);
            }
        } catch (e) {
        }
    };

    const getData = async ( topic ) => {
        if (!topic) {
            return;
        }
        try {
            const value = await AsyncStorage.getItem('topic@' + topic);
            if (value !== null) {
                setTopicSubscribed(value === 'true');
                console.log(value);
            } else {
                await storeData(false);
                setTopicSubscribed(false);
            }
        } catch (e) {
        }
    };

    return ( <>
            <Text>
                { device ? JSON.stringify(device) : 'Loading...' }
            </Text>
            <Text>
                Subscribed to topic:
            </Text>
            <Switch
                value={ topicSubscribed }
                tintColor={ '#7289DA' }
                onValueChange={ ( value ) => {
                    storeData(device?.topic, value).then();
                } }
            />
        </>
    );
}
