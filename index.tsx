import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Index() {
  // Set weather type as any to avoid strict type checking
  const [weather, setWeather] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cityWeatherList, setCityWeatherList] = useState<any[]>([]);

  // List of additional cities with their coordinates
  const additionalCities = [
    { name: "New York", latitude: 40.7128, longitude: -74.0060 },
    { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
    { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
    { name: "Houston", latitude: 29.7604, longitude: -95.3698 },
    { name: "Phoenix", latitude: 33.4484, longitude: -112.0740 },
    { name: "Philadelphia", latitude: 39.9526, longitude: -75.1652 },
    { name: "San Antonio", latitude: 29.4241, longitude: -98.4936 },
    { name: "San Diego", latitude: 32.7157, longitude: -117.1611 },
    { name: "Dallas", latitude: 32.7767, longitude: -96.7970 },
    { name: "San Jose", latitude: 37.3382, longitude: -121.8863 },
    { name: "Austin", latitude: 30.2672, longitude: -97.7431 },
    { name: "Jacksonville", latitude: 30.3322, longitude: -81.6557 },
    { name: "Fort Worth", latitude: 32.7555, longitude: -97.3308 },
    // You now have a list of more than 10 cities
  ];



  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      let { status } = await
      Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      // Retrieve the current location
      const currentLocation = await
      Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      // Save location to state
      setLocation({ latitude, longitude });
      // Fetch weather data for the current location
      fetchWeather(latitude, longitude, "Your Location");
    };



  const fetchWeather = async (latitude: number, longitude: number,
  cityName: string) => {

    const apiKey = '6aff654d8cc426ceb3aa5a0d6fbb8ccc'; // Replace with your APIkey
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        const cityWeather = {
          name: cityName,
          temp: `${data.main.temp}°F`,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          humidity: `${data.main.humidity}%`,
          windSpeed: `${data.wind.speed}MPH`,
        };
        setCityWeatherList(prevList => [cityWeather, ...prevList]); // Adds to the list
      }
      else {
        alert('Failed to fetch weather data.');
      }
    } catch (error) {
      alert('Error fetching weather data.');
    }
  };
  getLocationAndFetchWeather();
  additionalCities.forEach(city => {
    fetchWeather(city.latitude, city.longitude, city.name);
  });
  }, []);




return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  <Text>Weather in Your Location and Other Cities:</Text>
  {errorMsg ? (
    <Text>{errorMsg}</Text>
  ) : (
    <FlatList
      data={cityWeatherList}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
          router.push({
          pathname: '/CityDetail',
          params: { cityData: JSON.stringify(item) }, //Serialize cityData as a JSON string
          })

        }
        >
        <View style={{ padding: 10, alignItems: 'center' }}>
          <Text>{item.name}</Text>
          <Text>Temperature: {item.temp}</Text>
          <Text>Conditions: {item.description}</Text>
        </View>
        </TouchableOpacity>
      )}
      />
  )}
  </View>
 );
}