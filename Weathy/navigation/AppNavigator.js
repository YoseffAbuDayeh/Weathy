import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../Screens/HomeScreen.js'
import Submit from '../Screens/SubmitReportScreen.js'
import PastReportsScreen from '../Screens/PastReportsScreen.js';
import DownloadReportScreen from '../Screens/DownloadReportScreen.js';


const Stack = createNativeStackNavigator();
function AppNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{headerShown: true}}
        >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Home Screen'}}
        ></Stack.Screen>
        <Stack.Screen
          name="SubmitReport"
          component={Submit}
          options={{title: 'Submit Report'}}
        ></Stack.Screen>
        <Stack.Screen
          name="PastReports"
          component={PastReportsScreen}
          options={{title: 'Submit Report'}}
        ></Stack.Screen>
        <Stack.Screen
          name="DownloadReport"
          component={DownloadReportScreen}
          options={{title: 'DownloadReport'}}
        ></Stack.Screen>
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default AppNavigator;
  