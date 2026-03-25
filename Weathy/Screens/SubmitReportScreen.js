import React, { useState } from 'react';
import {
  View,
  Button,
  Image,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { db } from '../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';
import * as Haptics from 'expo-haptics';

const SubmitReportScreen = () => {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const [weatherType, setWeatherType] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64(result.assets[0].base64);
    }
  };

  const submitToFirebase = async () => {
    if (!base64 || !weatherType) {
      Alert.alert('Missing fields', 'Please select an image and weather type.');
      return;
    }

    try {
      await addDoc(collection(db, 'weatherLogs'), {
        imageBase64: base64,
        weatherType,
        timestamp: new Date().toISOString(),
      });
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Alert.alert('Success', 'Weather log saved!');
      setImage(null);
      setBase64(null);
      setWeatherType('');
    } catch (error) {
      console.error('Error writing to Firestore:', error);
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Weather Report</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Weather Photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Text style={styles.label}>Select Weather Type:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={weatherType}
          onValueChange={(itemValue) => setWeatherType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Select --" value="" />
          <Picker.Item label="Sunny" value="sunny" />
          <Picker.Item label="Cloudy" value="cloudy" />
          <Picker.Item label="Rainy" value="rainy" />
          <Picker.Item label="Snowy" value="snowy" />
          <Picker.Item label="Stormy" value="stormy" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitToFirebase}>
        <Text style={styles.submitText}>Submit Report</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubmitReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  pickerWrapper: {
    width: '100%',
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  submitButton: {
    backgroundColor: '#28A745',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
