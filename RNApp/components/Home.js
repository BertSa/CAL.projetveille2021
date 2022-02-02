import { Alert, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { subscribeToTopic, unsubscribeToTopic } from '../core/EnvironmentConstants';
import CustomButton from './CustomButton';
import DeviceButton from './DeviceButton';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export default function Home( props ) {
    useEffect(() => {
        if (auth().currentUser) {
            subscribeToTopic(auth().currentUser.uid);
        }
    }, []);

    function handleLogout() {
        unsubscribeToTopic(auth().currentUser.uid);
        auth()
            .signOut()
            .then(() => {
                console.log('Logged out');
                props.navigation.replace('Auth');
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
                        auth().currentUser
                            .delete()
                            .then(() => {
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
                                                props.navigation.replace('Auth');
                                            });
                                    }
                                }
                            );
                    }
                }
            ],
            {cancelable: false}
        );

    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic" style={ {backgroundColor: '#00000000'} }>
            <Text style={ {fontSize: 32, fontWeight: 'bold', color: '#757575'} }>
                DomoApp
            </Text>
            <Text style={ {color: '#bababa', marginTop: 12} }>
                Hello { auth().currentUser.displayName }!
            </Text>
            <View style={ styles.fixToText }>
                <WrapContainer>
                    <DeviceButton deviceId="laundry" disabledOnPress/>
                    <DeviceButton deviceId="waterleak"/>
                </WrapContainer>
            </View>
            <Separator/>
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
        </ScrollView> );
}

function Separator() {
    const isDarkMode = useColorScheme() === 'dark';

    return <View style={ {
        marginVertical: 8,
        borderBottomColor: isDarkMode ? '#EEE' : '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth
    } }/>;
}

function WrapContainer( {children} ) {
    return (
        <View style={ [ styles.wrapContainer ] }>
            { children }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
        paddingHorizontal: 20
    },
    fixToText: {
        marginTop: 32,
        flex: 1
    },
    switchButton: {
        marginHorizontal: 12,
        marginTop: 8
    },
    wrapContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    textSwitchButton: {
        fontWeight: '600'
    }
});
