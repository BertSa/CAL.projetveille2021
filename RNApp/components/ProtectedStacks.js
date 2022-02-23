import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Dashboard } from './Dashboard/Dashboard';
import { DeviceDetailsScreen } from './DeviceDetailsScreen';
import { ProfileScreen } from './ProfileScreen';

export default function ProtectedStacks( props ) {
    const {stack} = props;
    const [ avatar, setAvatar ] = useState();
    useEffect(() => {
        if (auth().currentUser) {
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

    const mDash = () => <Dashboard avatar={ avatar } />;

    return (
        <stack.Navigator initialRouteName="Dashboard">
            <stack.Screen
                name="Dashboard"
                component={ mDash }
                options={ {headerShown: false} }
            />
            <stack.Group>
                <stack.Screen
                    name="DeviceDetails"
                    component={ DeviceDetailsScreen }
                    options={ {headerBackTitleVisible: false} }
                />
            </stack.Group>
            <stack.Screen
                name="Profile"
                component={ ProfileScreen }
                options={ {headerBackTitleVisible: false} }
            />
        </stack.Navigator> );
}

