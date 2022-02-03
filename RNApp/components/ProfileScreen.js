import { unsubscribeToTopic } from '../core/EnvironmentConstants';
import auth from '@react-native-firebase/auth';
import { Alert, Text, ToastAndroid } from 'react-native';
import CustomButton from './Shared/CustomButton';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ProfileScreen( props ) {

    async function unsubscribeFromAllTopics(uid) {
        unsubscribeToTopic(uid);
        let keys = [];
        try {
            keys = await AsyncStorage.getAllKeys();
        } catch (e) {
        }
        keys.filter(key => key.includes('topic@'))
            .forEach(key => {
                AsyncStorage.getItem(key)
                    .then(value => {
                        if (value==='true') {
                            unsubscribeToTopic(key.replace('topic@', ''));
                        }
                    });
            });
    }

    async function handleLogout() {
        await unsubscribeFromAllTopics(auth().currentUser.uid);
        auth()
            .signOut()
            .then(() => {
                console.log('Logged out');
                props.navigation.push('Auth');
            });
    }

    function handleDeleteAccount() {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        const uid = auth().currentUser.uid;
                        auth().currentUser
                            .delete()
                            .then(() => {
                                unsubscribeFromAllTopics(uid).then();
                                console.log('User deleted');
                                props.navigation.replace('Auth');
                            })
                            .catch(error => {
                                    console.log(error);
                                    if (error.code === 'auth/requires-recent-login') {
                                        auth()
                                            .signOut()
                                            .then(() => {
                                                console.log('Logged out');
                                                ToastAndroid.show('Please log in again to delete your account', ToastAndroid.SHORT);
                                                props.navigation.replace('Auth');
                                            });
                                    }
                                }
                            );
                    }
                }
            ],
            {cancelable: true}
        );

    }

    return <>
        <Text>Settings</Text>
        <CustomButton onPress={ handleLogout } title="Logout"/>
        <CustomButton onPress={ () => {
            launchImageLibrary({mediaType: 'photo', selectionLimit: 1})
                .then(result => result.assets[0])
                .then(( asset ) => {
                    const uri = asset.uri;
                    let ext = uri.split('.').pop();
                    storage()
                        .ref(`/images/users/${ auth().currentUser.uid }/avatar.${ ext }`)
                        .putFile(uri)
                        .then(() => {
                            console.log('Uploaded');
                        });
                });
        } } title="Upload avatar"/>
        <CustomButton onPress={ handleDeleteAccount } title="DeleteAccount" color="#f44336"/>
    </>;
}
