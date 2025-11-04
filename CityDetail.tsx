import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
export default function CityDetail() {
    // Use useLocalSearchParams to get the serialized cityData parameter
    const { cityData } = useLocalSearchParams<{ cityData: string }>();
    // If cityData is undefined or null, return a fallback message
    if (!cityData) return <Text>No city data available</Text>;
    // Parse cityData since it's passed as a JSON string
    const parsedCityData = JSON.parse(cityData);
    return (
        <View style={styles.detailContainer}>
        <Text style={styles.cityName}>{parsedCityData.name}</Text>
        <Text>Temperature: {parsedCityData.temp}</Text>
        <Text>Conditions: {parsedCityData.description}</Text>
        <Text>Humidity: {parsedCityData.humidity}</Text>
        <Text>Wind Speed: {parsedCityData.windSpeed}</Text>
        <Image
        style={{ width: 100, height: 100 }}
        source={{ uri: `https://openweathermap.org/img/wn/${parsedCityData.icon}.png` }}
        />
        </View>
    );
}
const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#F8FAFC',
    },
    card: {
        width: '100%',
        maxWidth: 540,
        padding: 20,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        // Android elevation
        elevation: 3,
    },
    cityName: {
        fontSize: 32,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 8,
        letterSpacing: 0.2,
    },
    temperature: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 6,
    },
    description: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#475569',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        color: '#64748B',
        marginRight: 8,
    },
    value: {
        fontSize: 16,
        color: '#0F172A',
        fontWeight: '500',
    },
    icon: {
        width: 100,
        height: 100,
        marginTop: 12,
    },
});