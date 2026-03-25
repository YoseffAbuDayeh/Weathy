// HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weathy</Text>
      <Text style={styles.subtitle}>Weather journal</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Submit Report"
          onPress={() => navigation.navigate('SubmitReport')}
        />
        <Button
          title="View Past Reports"
          onPress={() => navigation.navigate('PastReports')}
        />
        <Button
          title="Share/Download Report"
          onPress={() => navigation.navigate('DownloadReport')}
        />
      </View>

      <Text style={styles.footer}>Created by Yoseff Salim Abu Dayeh Portillo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EAF4FC',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#555',
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 60,
  },
  footer: {
    fontSize: 14,
    color: '#999',
  },
});
