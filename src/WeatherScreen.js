import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import axios from "axios";
import { WEATHER_APIKEY } from "@env";

import Icon from "react-native-vector-icons/FontAwesome5";
import { faCloud, faCloudRain, faSun } from "react-native-vector-icons";


const WeatherScreen = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async () => {
    const apiKey = WEATHER_APIKEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <Input
        placeholder="Enter city name"
        leftIcon={<Icon name="search" size={24} color="black" />}
        onChangeText={setCity}
        value={city}
        inputStyle={styles.input}
      />
      <Button
        title="Get Weather"
        onPress={getWeatherData}
        buttonStyle={styles.button}
      />
      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>{weatherData.name}</Text>
          <View style={styles.weatherDetails}>
            <Icon
             name={
                weatherData.weather[0].main === "Clouds"
                  ? "cloud"
                  : weatherData.weather[0].main === "Rain"
                  ? "cloud-showers-heavy"
                  : "sun"
              }
              size={50}
              color="gray"
            />
            <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
          </View>
          <Text style={styles.descText}>
              {weatherData.weather[0].description}
            </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 20,
    width: 200,
    backgroundColor: "orange",
  },
  weatherContainer: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 10,
  },
  weatherText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  weatherDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  temperature: {
    fontSize: 48,
    marginLeft: 20,
  },
});

export default WeatherScreen;
