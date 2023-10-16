import * as React from "react";
import ScreenOne from "./stackComponents/ScreenOne";
import ScreenTwo from "./stackComponents/ScreenTwo";
import DetailsScreen from "./DetailsScreen";
import Add from "./Add";
import { createStackNavigator } from '@react-navigation/stack';

//Her instantieres en StackNavigator.
const Stack = createStackNavigator()

/*
* I return() placeres en Stack.Navigator komponent, som i 'initialRoutName' henviser til DetailsScreen.
* Dernæst fastsættes tre Screens i Stacken. Disse er DetailsScreen, ScreenOne og ScreenTwo
* Hver Screen har individuel Styling qf den fremviste header.
 */
function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Details"
        >
            <Stack.Screen name="Details" component={Add}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: 'white'}}
                          }
            />
        </Stack.Navigator>
    )
}
export default StackNavigator