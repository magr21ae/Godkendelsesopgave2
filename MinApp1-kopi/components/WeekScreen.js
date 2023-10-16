import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import data from './data'; // Importér datafilen

const WeekScreen = ({ route, navigation }) => {
  const { week } = route.params;
  const recipesForWeek = data[week] || []; // Hent opskrifter fra databasen for den aktuelle uge

  return (
    <View style={styles.container}>
      <Text>Uge {week}</Text>
      {recipesForWeek.length > 0 ? (
        <View>
          <Text>Opskrifter for denne uge:</Text>
          {recipesForWeek.map((recipe, index) => (
            <Text key={index}>{recipe}</Text>
          ))}
        </View>
      ) : (
        <Text>Ingen opskrifter fundet for denne uge.</Text>
      )}
      <View style={styles.weekNavigation}>
        <Button
          title="Forrige uge"
          onPress={() => {
            const previousWeek = week - 1;
            navigation.push('Week', { week: previousWeek });
          }}
        />
        <Button
          title="Næste uge"
          onPress={() => {
            const nextWeek = week + 1;
            navigation.push('Week', { week: nextWeek });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default WeekScreen;
