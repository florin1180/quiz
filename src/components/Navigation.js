import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import Dashboard from '../screens/Dashboard';
import Help from '../screens/Help';
import Notes from '../screens/Notes';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Settings from '../screens/Settings';
import Statistics from '../screens/Statistics';
import Subscriptions from '../screens/Subscriptions';
import Tests from '../screens/Tests';


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNav = ({navigation}) => {
  <Drawer.Navigator drawerContent ={props => <DrawerContent {...props}/>}>
    <Drawer.Screen name = "Dashboard" component={Dashboard}/>
    <Drawer.Screen name = "Help" component={Help}/>
    <Drawer.Screen name = "HomeScreen" component={HomeScreen}/>
    <Drawer.Screen name = "Notes" component={Notes}/>
    <Drawer.Screen name = "Profile" component={Profile}/>
    <Drawer.Screen name = "Search" component={Search}/>
    <Drawer.Screen name = "Settings" component={Settings}/>
    <Drawer.Screen name = "Statistics" component={Statistics}/>
    <Drawer.Screen name = "Subscriptions" component={Subscriptions}/>
    <Drawer.Screen name = "Tests" component={Tests}/>
  </Drawer.Navigator>
}

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.token ? ( */}
          <Stack.Screen name="Dashboard" component={Dashboard} />
        {/* ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
