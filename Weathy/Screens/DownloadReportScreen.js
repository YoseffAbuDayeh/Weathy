import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import * as SMS from 'expo-sms';
import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';


export default function DownloadReportScreen() {
  const [logs, setLogs] = useState([]);
  const [recipients, setRecipients] = useState({});

  const fetchLogs = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'weatherLogs'));
      const data = snapshot.docs.map((doc) => doc.data());
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const sendSingleReportViaSMS = async (log, index) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const available = await SMS.isAvailableAsync();
    if (!available) {
      Alert.alert('SMS Not Available');
      return;
    }

    const recipient = recipients[index];
    if (!recipient) {
      Alert.alert('Missing number', 'Please enter a phone number.');
      return;
    }

    const message = `Weathy data \n\nWeather: ${log.weatherType}\nDate: ${new Date(
      log.timestamp
    ).toLocaleString()}`;
    await SMS.sendSMSAsync([recipient], message);
  };

  const sendSingleReportViaEmail = async (log, index) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const available = await MailComposer.isAvailableAsync();
  if (!available) {
    Alert.alert('Email Not Available');
    return;
  }

  const recipient = recipients[index];
  if (!recipient) {
    Alert.alert('Missing email', 'Please enter an email address.');
    return;
  }

  let imagePath = null;
  if (log.imageBase64) {
    const fileName = `log_image_${index + 1}.jpg`;
    imagePath = FileSystem.documentDirectory + fileName;
    await FileSystem.writeAsStringAsync(imagePath, log.imageBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }

  const message = `Weathy data\n\nWeather: ${log.weatherType}\nDate: ${new Date(
    log.timestamp
  ).toLocaleString()}`;

  await MailComposer.composeAsync({
    recipients: [recipient],
    subject: `Weather Report Entry ${index + 1}`,
    body: message,
    attachments: imagePath ? [imagePath] : [],
  });
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Export Reports</Text>

      <FlatList
        data={logs}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.weather}>{item.weatherType}</Text>
            <Text>{new Date(item.timestamp).toLocaleString()}</Text>

            {item.imageBase64 && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
                style={styles.image}
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Enter phone or email"
              value={recipients[index] || ''}
              onChangeText={(text) =>
                setRecipients((prev) => ({ ...prev, [index]: text }))
              }
            />

            <View style={styles.actionRow}>
              <TouchableOpacity
                onPress={() => sendSingleReportViaSMS(item, index)}
                style={styles.actionButton}
              >
                <Text style={styles.actionText}>SMS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => sendSingleReportViaEmail(item, index)}
                style={styles.actionButton}
              >
                <Text style={styles.actionText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
  },
  weather: { fontSize: 18, fontWeight: '600' },
  image: { width: '100%', height: 200, marginTop: 10, borderRadius: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginTop: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
