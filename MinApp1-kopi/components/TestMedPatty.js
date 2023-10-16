import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Button} from 'react-native';

import {useEffect, useState} from "react";
import { getDatabase, ref, onValue, get,  query, orderByChild, equalTo, off} from "firebase/database";
import data from './data';

function TestMedPatty({navigation}){

    const [weekadd, setWeek] = useState(0);
    const [thisweek, setThisweek] = useState("")

    const [cars,setCars] = useState()

    useEffect(() => {
        function getCurrentWeek() {
            const now = new Date();
          
            // Set the date to the first day of the year
            const startOfYear = new Date(now.getFullYear(), 0, 1);
          
            // Calculate the number of milliseconds in a week
            const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
          
            // Calculate the difference in milliseconds between the current date and the start of the year
            const differenceInMilliseconds = now - startOfYear;
          
            // Calculate the current week number
            const weekNumber = Math.ceil(differenceInMilliseconds / millisecondsInAWeek);
          
            return weekNumber + weekadd;
          }
        const currentWeek = JSON.stringify(getCurrentWeek())
        setThisweek(currentWeek)

        const db = getDatabase();  
        //const carsRef = ref(getDatabase());
       /*     get(child(carsRef, `Cars/id/${Uge}`)).then((snapshot) => {
         if (snapshot.exists()) {
                 console.log(snapshot.val());
        } else {
            console.log("No data available");
  }
        }).catch((error) => {
  console.error(error);
});*/
        const carsRef = query(ref(db, "Cars"), orderByChild('Uge'), equalTo(currentWeek));
    
        // Use the 'onValue' function to listen for changes in the 'Cars' node
        onValue(carsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // If data exists, set it in the 'cars' state
                setCars(data);
            }
        });
    
        // Clean up the listener when the component unmounts
        return () => {
            // Unsubscribe the listener
            off(carsRef);
        };
    }, []); // The empty dependency array means this effect runs only once

    // Vi viser ingenting hvis der ikke er data
    if (!cars) {
        return <Text>Loading...</Text>;
    }

    const handleSelectCar = id => {
        /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
        const car = Object.entries(cars).find( car => car[0] === id /*id*/)
        navigation.navigate('Car Details', { car });
    };
    
    // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
    const carArray = Object.values(cars);
    const carKeys = Object.keys(cars);

    return (
        <View>
        <View>
        <View style={styles.weekNavigation}>
            
        <Button
          title="Forrige uge"
          onPress={() => {
            setWeek(weekadd - 1)
          }}
        />
        <Text>{thisweek}</Text>
        <Button
          title="Næste uge"
          onPress={() => {
            setWeek(weekadd + 1)
          }}
        />
      </View>
        </View>
        <View>
        <FlatList
            data={carArray}
            // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
            keyExtractor={(item, index) => carKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectCar(carKeys[index])}>
                        <Text>
                            {item.Opskrift} {item.Uge}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
         </View>

        </View>
    );
}

export default TestMedPatty;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
    weekNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
      },
});
  