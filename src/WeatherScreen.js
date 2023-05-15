import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import axios from "axios";

const WeatherScreen = () => {
  const [city, setCity] = useState("");
  const getWeatherData = async () => {
    const apiKey = "YOUR_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await axios.get(url);
    console.log(response.data);
  };

  return (
    <View>
      <Text>Weather App</Text>
      <Input
        placeholder="Enter city name"
        leftIcon={<Icon name="search" size={24} color="black" />}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={getWeatherData} />
    </View>
  );
};

export default WeatherScreen;
