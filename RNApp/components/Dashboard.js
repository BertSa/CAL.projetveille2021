import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import GorgeousHeader from 'react-native-gorgeous-header/lib/GorgeousHeader';
import menuImage from '../assets/menu.png';
import DeviceButton from './DeviceButton';
import React from 'react';

export function Dashboard( props ) {
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
                        props.navigation.navigate('Settings');
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
