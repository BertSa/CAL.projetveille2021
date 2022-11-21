import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import GorgeousHeader from 'react-native-gorgeous-header/lib/GorgeousHeader';
import menuImage from '../../assets/images/menu.png';
import DeviceButton from './DeviceButton';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Separator } from '../Shared/Separator';
import defaultAvatar from '../../assets/images/default-avatar.png';

export function Dashboard( {avatar} ) {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation();
    return (
        <>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic" style={ {backgroundColor: '#00000000'} }>
                <GorgeousHeader
                    menuImageSource={ menuImage }
                    menuImageStyle={ {width: 25, height: 25, tintColor: '#FFFFFF'} }
                    profileImageSource={ avatar ? {uri: avatar} : defaultAvatar }
                    profileImageStyle={ !avatar ? {
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        tintColor: isDarkMode ? '#FFF' : '#000'
                    } : null }
                    title={ 'Dashboard' }
                    titleTextStyle={ {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: isDarkMode ? '#FFFFFF' : '#000000'
                    } }
                    menuImageOnPress={ () => {} }
                    profileImageOnPress={ () => {
                        navigation.navigate('Profile');
                    } }
                />
                <View style={ styles.fixToText }>
                    <WrapContainer>
                        <DeviceButton deviceId="laundry" disabledOnPress/>
                        <DeviceButton deviceId="valve"/>
                    </WrapContainer>
                </View>
                <Separator/>
            </ScrollView>
        </>
    );
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
