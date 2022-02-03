import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Dashboard } from './Dashboard';
import { DeviceDetails } from './DeviceDetails';
import { ProfileScreen } from './ProfileScreen';

export default function Home( props ) {
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

    const mDash = () => <Dashboard avatar={ avatar } navigation={ props.navigation }/>;

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
                    component={ DeviceDetails }
                    options={ {headerBackTitleVisible: false} }
                />
            </stack.Group>
            <stack.Screen
                name="Settings"
                component={ ProfileScreen }
                options={ {headerBackTitleVisible: false} }
            />
        </stack.Navigator> );
}

