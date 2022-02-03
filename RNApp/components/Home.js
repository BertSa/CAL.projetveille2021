import { Alert, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { subscribeToTopic, unsubscribeToTopic } from '../core/EnvironmentConstants';
import CustomButton from './CustomButton';
import DeviceButton from './DeviceButton';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import menuImage from '../assets/menu.png';
import GorgeousHeader from 'react-native-gorgeous-header/lib/GorgeousHeader';

export default function Home( props ) {
    const {stack} = props;
    const [ avatar, setAvatar ] = useState();
    useEffect(() => {
        if (auth().currentUser) {
            subscribeToTopic(auth().currentUser.uid);
            storage()
                .ref(`/images/users/${ auth().currentUser.uid }`)
                .listAll()
                .then(res => {
                    if (res.items.length > 0) {
                        res.items
                            .find(item => item.name.includes('avatar'))
                            .getDownloadURL()
                            .then(url => {
                                setAvatar(url);
                                console.log('Avatar found!');
                            });
                    }
                });
        }
    }, []);

const mDash=()=><Dash avatar={avatar} navigation={props.navigation}/>
    return (

        <stack.Navigator initialRouteName="Dashboard">
            <stack.Screen
                name="Dashboard"
                component={ mDash }
                options={ {
                    headerShown: false
                } }
            />
            <stack.Screen
                name="Settings"
                component={ SettingsRNN }
                options={ {
                    headerBackTitleVisible: false
                } }
            />
        </stack.Navigator> );
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

function SettingsRNN( props ) {
    return <Text>Settings</Text>;
}

function Dash( props ) {

    function handleLogout() {
        unsubscribeToTopic(auth()?.currentUser?.uid);
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
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic" style={ {backgroundColor: '#00000000'} }>
                <GorgeousHeader
                    menuImageSource={ menuImage }
                    menuImageStyle={ {width: 25, height: 25, tintColor: '#FFFFFF'} }
                    profileImageSource={ {
                        uri:
                            props.avatar ?? 'https://images.unsplash.com/photo-1514846226882-28b324ef7f28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'
                    } }
                    title={ 'Home' }
                    titleTextStyle={ {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#ffffff'
                    } }
                    menuImageOnPress={ () => {} }
                    profileImageOnPress={ () => {
                        props.navigation.navigate('Settings')
                        // launchImageLibrary({mediaType: 'photo', selectionLimit: 1})
                        //     .then(result => result.assets[0])
                        //     .then(( asset ) => {
                        //         const uri = asset.uri;
                        //         let ext = uri.split('.').pop();
                        //         storage()
                        //             .ref(`/images/users/${ auth().currentUser.uid }/avatar.${ ext }`)
                        //             .putFile(uri)
                        //             .then(() => {
                        //                 console.log('Uploaded');
                        //             });
                        //     });

                    } }
                />
                <View style={ styles.fixToText }>
                    <WrapContainer>
                        <DeviceButton deviceId="laundry" disabledOnPress/>
                        <DeviceButton deviceId="waterleak"/>
                    </WrapContainer>
                </View>
                <Separator/>
                <CustomButton onPress={ handleLogout } title="Logout"/>
                <CustomButton onPress={ () => {

                } } title="Upload avatar"/>
                <CustomButton onPress={ handleDeleteAccount } title="DeleteAccount" color="#f44336"/>

            </ScrollView>
        </>
    );
}
