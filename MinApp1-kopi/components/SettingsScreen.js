import {StyleSheet, Text, View} from "react-native";
import * as React from "react";

import KalenderOverblik from "./Calendar"; 

//SettingsScreen komponenten tager en prop med og printer indholdet af denne prop i en <Text>
function SettingsScreen({prop}) {
    return (
        
            <KalenderOverblik></KalenderOverblik>
    );
}

export default SettingsScreen

//Styling til brug i SettingsScreen
const styles = StyleSheet.create({
    container: {
        paddingTop:100,
        paddingBottom:100,
        borderColor: 'yellow',
        borderWidth: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height:'100%'
    },
    text: {
        fontSize: 15,
    },
});
