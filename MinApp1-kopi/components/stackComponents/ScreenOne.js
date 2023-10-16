import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

/*ScreenOne er den ene af de tre screens i StackNavigatoren
ScreenOne prÃĻsenterer en tekst, der beskriver, hvor brugeren befinder sig samt
returnerer to <Button/>, som benyttes til henholdsvis at navigere tilbage til sidste Screen og navigere ind til den anden screen i stackComponents
 */
function ScreenOne({ navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Rediger!</Text>
            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
                <View style={{margin: '2%'}} >
                    <Button title="Tilbage" onPress={() => navigation.goBack() } />
                </View>
                <View style={{margin: '2%'}} >
                    <Button title="Start ny plan" onPress={() => navigation.navigate('ScreenTwo')}  />
                </View>
            </View>
        </View>
    );
}
export default ScreenOne


//Styling til brug i ScreenOne
const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});