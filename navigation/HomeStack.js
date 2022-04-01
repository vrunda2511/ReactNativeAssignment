import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';     
import LogOut from '../screens/LogOut';     
import MapScreen from '../screens/MapScreen';
import Reminder from '../screens/Reminder';

const Drawer = createDrawerNavigator();

export default function HomeStack() {
  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Dashboard" component={HomeScreen} />
        <Drawer.Screen name="Reminder" component={Reminder} />
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="Logout"  component={LogOut} />
      </Drawer.Navigator>
  );
}