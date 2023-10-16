import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

/*
 * Denne metode bruges til at udføre navigation i appen baseret på de angivne argumenter.
 * Metoden bruger 'navigation.navigate' metoden, som er en foruddefineret metode, til at navigere til en bestemt komponent
 * i appen, der er knyttet til det angivne rutenavn.
 
 * @param {Object} navigation - Et objekt, der repræsenterer navigationen i appen og giver adgang til navigationssystemets funktioner.
 * @param {string} route - Navnet på den rute eller komponent, som skal navigeres til.
 */
const navController = (navigation, route) =>{
    navigation.navigate(route)
}


/*
 * DetailsScreen tager 'navigation' med som argument. navigation er en automatisk prædefineret prop, der kan refereres til i alle screen komponenter.
 *Derudover styles DetailsScreen, som indeholder omfatter to button komponenter, der benytters til at aktivere vores navController metode
 */
function DetailsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Her kan du se din indkøbsliste!</Text>
            <Button title="Rediger" onPress={() => navController(navigation, 'ScreenOne')}  />
            <Button title="Start ny plan" onPress={() => navController(navigation, 'ScreenTwo')}  />
        </View>
    );
}

export default DetailsScreen


//Styling til brug i DetailsScreen.
const styles = StyleSheet.create({
    container: {
        paddingTop:100,
        paddingBottom:100,
        borderColor: 'white',
        borderWidth: 20,
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