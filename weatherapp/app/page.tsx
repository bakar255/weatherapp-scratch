'use client'

import Image from "next/image";
import { useState, useEffect } from "react";


export default function WeatherApp() {

  const [WeatherData, setWeatherData] = useState("");
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [Loading, setLoading] = useState(false);
  
  // Function to fetch weather
  const FetchWeather = async () => {
    try {
      const URL = `https://api.open-meteo.com/v1/forecast?latitude=${Latitude}&longitude=${Longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=sunrise,sunset&timezone=auto`; 
      
      console.log("URL call:", URL);

      const response = await fetch(URL);
      const data = await response.json();

      setLoading(true);
      setWeatherData(data);
      console.log(data);

    } catch (error) {
      console.error("Error:", error);
      console.log("Error fetching API ! ", error);
    }

  }
  const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: "Ciel dégagé",
    1: "Principalement clair", 
    2: "Partiellement nuageux",
    3: "Couvert",
    45: "Brouillard",
    48: "Brouillard givrant",
    51: "Bruine légère",
    53: "Bruine modérée",
    55: "Bruine dense",
    61: "Pluie légère",
    63: "Pluie modérée",
    65: "Pluie forte",
    80: "Averses légères",
    81: "Averses modérées",
    82: "Averses violentes",
    95: "Orage",
    96: "Orage avec grêle légère",
    99: "Orage avec grêle forte"
  };
  return weatherCodes[code] || "Condition inconnue";
};

const getWeatherIcon = (code) => {
  const iconMap = {
    // Ciel clair
    0: "https://www.awxcdn.com/adc-assets/images/weathericons/1.svg", // Soleil
    1: "https://www.awxcdn.com/adc-assets/images/weathericons/2.svg", // Peu nuageux
    2: "https://www.awxcdn.com/adc-assets/images/weathericons/3.svg", 
    3: "https://www.awxcdn.com/adc-assets/images/weathericons/7.svg", 
    
    // Brouillard
    45: "https://www.awxcdn.com/adc-assets/images/weathericons/11.svg",
    48: "https://www.awxcdn.com/adc-assets/images/weathericons/11.svg",
    
    // Bruine
    51: "https://www.awxcdn.com/adc-assets/images/weathericons/12.svg",
    53: "https://www.awxcdn.com/adc-assets/images/weathericons/12.svg", // M
    55: "https://www.awxcdn.com/adc-assets/images/weathericons/12.svg",
    
    // Pluie
    61: "https://www.awxcdn.com/adc-assets/images/weathericons/18.svg",
    63: "https://www.awxcdn.com/adc-assets/images/weathericons/18.svg",
    65: "https://www.awxcdn.com/adc-assets/images/weathericons/18.svg",
    // Averses
    80: "https://www.awxcdn.com/adc-assets/images/weathericons/13.svg",
    81: "https://www.awxcdn.com/adc-assets/images/weathericons/14.svg",
    82: "https://www.awxcdn.com/adc-assets/images/weathericons/15.svg",
    // Orage
    95: "https://www.awxcdn.com/adc-assets/images/weathericons/4.svg",
    96: "https://www.awxcdn.com/adc-assets/images/weathericons/17.svg",
    99: "https://www.awxcdn.com/adc-assets/images/weathericons/17.svg"
  };
  
  return iconMap[code] || "https://www.awxcdn.com/adc-assets/images/weathericons/6.svg"; // défaut
};
 // function to get user position
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      
      const x = position.coords.latitude;
      const y =  position.coords.longitude;
      setLatitude(x);
      setLongitude(y);
    
    });
  }

    useEffect(() => {
     getUserLocation(); // Get user location in RT
   }, []);

  useEffect(() => {
    if (Latitude && Longitude) { // Get user position
     FetchWeather(); 
    }
  }, [Latitude, Longitude]);


  return (

    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black justify-center items-center p-4">

  {/* Timezone */}
  <div className="rounded-lg bg-gray-800 bg-opacity-50 px-4 py-2 mb-6 backdrop-blur-sm border border-gray-700">
    <span className="text-gray-300 text-sm font-medium">Timezone: {WeatherData?.timezone || "N/A"}</span>
  </div>

  {/* Card Weather */}
  <div className="w-80 h-110 bg-gray-700 bg-opacity-60 backdrop-blur-xl rounded-2xl p-6 flex flex-col shadow-2xl border border-gray-600">

    <span className="flex flex-col">Temperature :</span>
    
    {/* Température */}
   <div className="text-center mb-4">
  
  <div className="text-center mb-4">
  <img 
    src={getWeatherIcon(WeatherData?.current?.weather_code)} 
    alt="Météo"
    className="w-16 h-16 mx-auto mb-2"
  />
  <span className="text-4xl font-bold text-white block">
    {WeatherData?.current?.temperature_2m || "--"}°
  </span>
  <span className="text-gray-300 text-lg mt-2 block">
    {getWeatherDescription(WeatherData?.current?.weather_code || "--")}
  </span>
</div>

</div>

    {/* Détails météo */}
    <div className="space-y-4 mt-auto">
      <div className="flex justify-between items-center py-2 border-b border-gray-600">
        <p className="text-gray-400">Vent</p>
        <span className="text-white font-medium">
          {WeatherData?.current?.wind_speed_10m || "--"} {WeatherData?.current_units?.wind_speed_10m || "km/h"}
        </span>
      </div>
      
      <div className="flex justify-between items-center py-2 border-b border-gray-600">
        <p className="text-gray-400">Humidité</p>
        <span className="text-white font-medium">
          {WeatherData?.current?.relative_humidity_2m || "--"}%
        </span>
      </div>

      <div className="flex justify-between items-center py-2">
        <p className="text-gray-400">Pression</p>
        <span className="text-white font-medium">
          {WeatherData?.current?.surface_pressure || "--"} hPa
        </span>
      </div>
    </div>
  </div>
</div>
  );
}
