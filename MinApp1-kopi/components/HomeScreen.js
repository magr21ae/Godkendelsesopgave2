// Importerer de nødvendige biblioteker og moduler til React Native-appen
import * as React from "react";
import {View, Text, Button, StyleSheet} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';



// Importerer komponenter og moduler nødvendige for appens navigation og brugerflade.
import SettingsScreen from "./SettingsScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from "./StackNavigator";
import List from "./List";



//Oprettelse af en instans af tabnavigator.
const Tab = createBottomTabNavigator();

//Her oprettes en tekst reference, der skal benyttes i screen komponenter
const settingsScreenText = "Her kan du se din uges opskrifter!"

//HomeScreen komponenten tager en prop med og printer indholdet af denne i en <Text/>
function HomeScreen({prop}) {

    const auth = getAuth();
    const user = auth.currentUser
    //handleLogout håndterer log ud af en aktiv bruger.
    //Metoden er et asynkrontkald.
    const handleLogOut = async () => {
        await signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // Hvis der sker en error
          });
    };

    //Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger, skal der udprintes en besked om dette igennem en tekstkomponent
    if (!auth.currentUser) {
        return <View><Text>Not found</Text></View>;
    }
    
    return (
        // Dette JSX-element definerer hovedlayoutet for appen. Det består af følgende komponenter:
// - En View-komponent (container) til at indeholde brugerens oplysninger og en knap til at logge ud.
// - En NavigationContainer-komponent, der omgiver hovednavigationen i appen.
// - En Tab.Navigator-komponent til oprettelse af en bundnavigation med to faner.
// - Indstillinger for fanerne, herunder farver, ikoner og komponenter, der skal vises på hver fane.
// - StatusBar til styring af appens statuslinje.
        
        <><View style={styles.container}>
            <Text>Current user: {user.email}</Text>
            <Button onPress={() => handleLogOut()} title="Log out" />
        </View>

        <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "blue",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: [
                        {
                            display: "flex"
                        },
                        null
                    ],
                    tabBarIcon: ({ color, size }) => {
                        if (route.name === 'Din uge') {
                            return (
                                <Ionicons
                                    name='md-calendar-outline'
                                    size={size}
                                    color={color} />
                            );
                        } else {
                            return (
                                <Ionicons
                                    name='md-cart-outline'
                                    size={size}
                                    color={color} />
                            );
                        }
                    },
                })}
                >
                    <Tab.Screen name="Din uge" component={SettingsScreen} />
                    <Tab.Screen name="Opret" component={StackNavigator} />
                    <Tab.Screen name="Opskrifter" component={List} />
                </Tab.Navigator>
                <StatusBar style="auto" />
            </NavigationContainer></>
            
    );


}
export default HomeScreen

//Styling til brug i HomeScreen
const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        borderWidth: 50,
        flex: 0.07,
        justifyContent: 'top',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});