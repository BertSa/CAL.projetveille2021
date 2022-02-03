import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface ICustomButtonProps {
    onPress : () => void;
    title : string;
    color? : string;
}

export default function CustomButton( props : ICustomButtonProps ) {
    const color = props.color ? props.color : '#7289DA';
    return (
        <TouchableOpacity
            activeOpacity={ 0.5 }
            onPress={ props.onPress }
            style={ {
                color: '#000',
                backgroundColor: color,
                borderColor: color,
                borderWidth: 0,
                borderRadius: 5,
                height: 40,
                alignItems: 'center',
                marginLeft: 35,
                marginRight: 35,
                marginTop: 5,
                marginBottom: 5
            } }>
            <Text
                style={ {
                    color: '#FFF',
                    paddingVertical: 10,
                    fontSize: 16
                } }>
                { props.title }
            </Text>
        </TouchableOpacity>
    );
}
