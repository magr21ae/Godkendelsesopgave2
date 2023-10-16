import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
//import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

import { getDatabase, ref, child, push, update  } from "firebase/database";


function Add ({navigation,route}){

    const db = getDatabase();

    const initialState = {
        Opskrift: '',
        Uge: '',
        Arbejdstid: '',
        Personer: ''
    }

    const [newCar,setNewCar] = useState(initialState);

    /*Returnere true, hvis vi er på edit car*/
    const isEditCar = route.name === "Edit Car";

    useEffect(() => {
        if(isEditCar){
            const car = route.params.car[1];
            setNewCar(car)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewCar(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewCar({...newCar, [name]: event});
    }

    const handleSave = async () => {

        const { Opskrift, Uge, Arbejdstid, Personer } = newCar;

        if(Opskrift.length === 0 || Uge.length === 0 || Arbejdstid.length === 0 || Personer.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditCar){
            const id = route.params.car[0];
            // Define the path to the specific car node you want to update
            const carRef = ref(db, `Cars/${id}`);

            // Define the fields you want to update
            const updatedFields = {
                Opskrift,
                Uge,
                Arbejdstid,
                Personer,
            };
            
            // Use the 'update' function to update the specified fields
            await update(carRef, updatedFields)
                .then(() => {
                Alert.alert("Din info er nu opdateret");
                const car = newCar
                navigation.navigate("Car Details", { car });
                })
                .catch((error) => {
                console.error(`Error: ${error.message}`);
                });

        }else{
        // Define the path to the "Cars" node where you want to push the new data
        const carsRef = ref(db, "/Cars/");
        
        // Data to push
        const newCarData = {
            Opskrift,
            Uge,
            Arbejdstid,
            Personer,
        };
        
        // Push the new data to the "Cars" node
        await push(carsRef, newCarData)
            .then(() => {
            Alert.alert("Saved");
            setNewCar(initialState);
            })
            .catch((error) => {
            console.error(`Error: ${error.message}`);
            });
    }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newCar[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit car, vis save changes i stedet for add car*/}
                <Button title={ isEditCar ? "Save changes" : "Tilføj opskrift"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});