import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WeekScreen from './WeekScreen';
import TestMedPatty from './TestMedPatty';

const Stack = createNativeStackNavigator();

const KalenderOverblik = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Week"
        //component={WeekScreen}
        component = {TestMedPatty}
        //initialParams={{ week: new Date().getWeek() }}
        //options={({ route }) => ({ title: `Uge ${route.params.week}` })}
      />
    </Stack.Navigator>
  );
};

export default KalenderOverblik;

// Hjælpefunktion til at få den aktuelle uge (skal jeg måske bruge senere)
Date.prototype.getWeek = function () {
  const date = new Date(this);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
