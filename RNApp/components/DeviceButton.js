import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import * as EnvironmentConstants from '../core/EnvironmentConstants';
import { StyleSheet, ToastAndroid, useColorScheme } from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import SwitchButton from '@freakycoder/react-native-switch-button/lib/SwitchButton';
import { useNavigation } from '@react-navigation/native';

interface IDeviceButtonProps {
    deviceId : string;
    disabledOnPress? : boolean;
    color? : string;
}

interface IDeviceProps {
    name? : string;
    imageSrc? : string;
    topic? : string;
}

export default function DeviceButton( props : IDeviceButtonProps ) {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const [ isLoading, setIsLoading ] = useState(true);

    const [ isActive, setIsActive ] = useState(false);
    const [ name, setName ] = useState('');
    const [ imageUri, setImageUri ] = useState('../assets/notification.png');

    useEffect(() => {
        let topic = 'default';
        if (auth().currentUser) {
            database()
                .ref(`${ EnvironmentConstants.DB_PATH_TO_DEVICE }/${ props.deviceId }`)
                .once('value', snapshot => {
                    let device : IDeviceProps | any = snapshot.val();
                    if (!device) {
                        return;
                    }
                    setName(device.name);
                    if (device.imageSrc) {
                        storage()
                            .ref(`/images/${ device?.imageSrc }.png`)
                            .getDownloadURL()
                            .then(url => setImageUri(url));
                    }
                    topic = device?.topic;
                })
                .then();
            database()
                .ref(
                    `${ EnvironmentConstants.DB_PATH_TO_DEVICE }/${ props.deviceId }/status`
                )
                .on('value', snapshot => {
                    if (typeof snapshot.val() === 'boolean') {
                        setIsActive(snapshot.val());
                    }
                });
            setIsLoading(false);
            return () => {
                database()
                    .ref(
                        `${ EnvironmentConstants.DB_PATH_TO_DEVICE }/${ props.deviceId }/status`
                    )
                    .off();
            };
        }
    }, []);

    const handleIsActive = ( device : string, isActive : boolean ) => {
        database()
            .ref(`${ EnvironmentConstants.DB_PATH_TO_DEVICE }/${ device }/status`)
            .set(isActive)
            .then(() => {
                console.log(`Status updated for ${ device }(${ isActive })`);
            })
            .catch(error => {
                if (error.code === 'database/permission-denied') {
                    console.log('Permission denied');
                    ToastAndroid.show('Permission denied!', ToastAndroid.SHORT);
                }
            });
    };

    if (isLoading) {
        return <></>;
    }

    return (
        <SwitchButton
            text={ name }
            isActive={ isActive }
            inactiveImageSource={ {uri: imageUri} }
            activeImageSource={ {uri: imageUri} }
            style={ styles.switchButton }
            textStyle={ styles.textSwitchButton }
            mainColor={ props.color ? props.color : '#7289DA' }
            tintColor={ props.color ? props.color : '#7289DA' }
            originalColor={ isDarkMode ? '#2C2F33' : '#fff' }
            sameTextColor
            disabledOnClick={ props.disabledOnPress }
            handleChange={ setIsActive }
            onPress={ isActive => handleIsActive(props.deviceId, isActive) }
            onLongPress={ () => {
                console.log('Long press');
                navigation.push('DeviceDetails', {
                    deviceId: props.deviceId
                });
            } }
        />
    );
}
const styles = StyleSheet.create({
    switchButton: {
        marginHorizontal: 12,
        marginTop: 8
    },
    textSwitchButton: {
        fontWeight: '600'
    }
});
