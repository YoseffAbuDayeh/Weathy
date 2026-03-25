import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { db } from '../utils/firebase';
import * as Haptics from 'expo-haptics';
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export default function PastReportsScreen() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const q = query(collection(db, 'weatherLogs'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Report',
      'Are you sure you want to delete this weather report?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'weatherLogs', id));
              setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              Alert.alert('Deleted', 'Report deleted successfully.');
            } catch (error) {
              console.error('Error deleting log:', error);
              Alert.alert('Error', 'Failed to delete report.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${item.imageBase64}` }}
        style={styles.image}
      />
      <Text style={styles.weather}>{item.weatherType.toUpperCase()}</Text>
      <Text style={styles.date}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Weather Reports</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  weather: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  date: {
    color: '#555',
    fontSize: 14,
    marginBottom: 8,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
});
