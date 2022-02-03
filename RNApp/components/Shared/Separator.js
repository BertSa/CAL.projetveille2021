import { StyleSheet, useColorScheme, View } from 'react-native';
import React from 'react';

export function Separator() {
    const isDarkMode = useColorScheme() === 'dark';

    return <View style={ {
        marginVertical: 8,
        borderBottomColor: isDarkMode ? '#EEE' : '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth
    } }/>;
}
