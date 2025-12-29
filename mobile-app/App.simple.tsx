// Ultra-simple version - guaranteed to work
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [area, setArea] = useState('');
  const [temperature, setTemperature] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handlePredict = async () => {
    if (!area || !temperature) {
      Alert.alert('Error', 'Please enter area and temperature');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropType: 'wheat',
          area: area,
          soilPh: '6.5',
          soilMoisture: '50',
          nitrogen: '100',
          phosphorus: '50',
          potassium: '70',
          temperature: temperature,
          rainfall: '800',
          humidity: '65',
          season: 'kharif',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        Alert.alert('Error', 'Failed to get prediction');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>🌾 Crop Yield Prediction</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Area (hectares)</Text>
          <TextInput
            style={styles.input}
            value={area}
            onChangeText={setArea}
            placeholder="10"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Temperature (°C)</Text>
          <TextInput
            style={styles.input}
            value={temperature}
            onChangeText={setTemperature}
            placeholder="25"
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handlePredict}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Predict Yield</Text>
            )}
          </TouchableOpacity>
        </View>

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Results</Text>
            <Text style={styles.resultText}>
              Yield: {result.predictedYield || 'N/A'} t/ha
            </Text>
            <Text style={styles.resultText}>
              Confidence: {result.confidence || 'N/A'}%
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: '#22c55e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9fafb',
  },
  button: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#eff6ff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
});




