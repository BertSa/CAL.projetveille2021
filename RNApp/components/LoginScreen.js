import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View
} from 'react-native';
import React, { createRef, useState } from 'react';
import auth from '@react-native-firebase/auth';
import CustomButton from './Shared/CustomButton';
import { subscribeToTopic } from '../core/EnvironmentConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen( {navigation} ) {
    const isDarkMode = useColorScheme() === 'dark';

    const [ userEmail, setUserEmail ] = useState('');
    const [ userPassword, setUserPassword ] = useState('');
    const [ errortext, setErrortext ] = useState('');
    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!userEmail) {
            alert('Please fill Email');
            return;
        }
        if (!userPassword) {
            alert('Please fill Password');
            return;
        }
        const reSub = async () => {
            let keys = [];
            try {
                keys = await AsyncStorage.getAllKeys();
            } catch (e) {
            }
            keys.filter(key => key.includes('topic@'))
                .forEach(key => {
                    AsyncStorage.getItem(key)
                        .then(value => {
                            if (value === 'true') {
                                subscribeToTopic(key.replace('topic@', ''));
                            }
                        });
                });
        };
        auth()
            .signInWithEmailAndPassword(userEmail, userPassword)
            .then(() => {
                console.log('User account created & signed in!');
                subscribeToTopic(auth().currentUser.uid);
                reSub().then();
                navigation.replace('Home');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                    console.log('That email address is invalid!');
                }

                if (error.code === 'auth/user-not-found') {
                    alert('User not found');
                    console.log('User not found');
                }

                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password');
                    console.log('Wrong password');
                }

                console.error(error);
            });
    };

    return (
        <View style={ styles.mainBody }>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={ {
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                } }>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={ styles.SectionStyle }>
                            <TextInput
                                style={ {
                                    ...styles.inputStyle,
                                    borderColor: isDarkMode ? '#FFF' : '#000'
                                } }
                                onChangeText={ UserEmail => setUserEmail(UserEmail) }
                                placeholder="Enter Email"
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={ () =>
                                    passwordInputRef.current && passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={ false }
                            />
                        </View>
                        <View style={ styles.SectionStyle }>
                            <TextInput
                                style={ {
                                    ...styles.inputStyle,
                                    borderColor: isDarkMode ? '#FFF' : '#000'
                                } }
                                onChangeText={ UserPassword => setUserPassword(UserPassword) }
                                placeholder="Enter Password"
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={ passwordInputRef }
                                onSubmitEditing={ Keyboard.dismiss }
                                blurOnSubmit={ false }
                                secureTextEntry={ true }
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
                            />
                        </View>
                        { errortext !== '' ? (
                            <Text style={ styles.errorTextStyle }>{ errortext }</Text>
                        ) : null }
                        <CustomButton onPress={ handleSubmitPress } title="Login"/>
                        <Text
                            style={ styles.registerTextStyle }
                            onPress={ () => navigation.navigate('RegisterScreen') }>
                            New Here ? Register
                        </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00000000'
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 5
    },
    registerTextStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14
    }
});
