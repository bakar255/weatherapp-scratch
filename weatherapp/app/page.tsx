'use client'

import Image from "next/image";
import { useState, useEffect } from "react";


export default function WeatherApp() {

  const [WeatherData, setWeatherData] = useState("");
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  
  // Function to fetch weather
  const FetchWeather = async () => {
    try {
      const URL = ``; 
      
      console.log("URL call:", URL);

      const response = await fetch(URL);
      const data = await response.json();

      setWeatherData(data);
      console.log(data);

    } catch (error) {
      console.error("Error:", error);
      console.log("Error fetching API ! ", error);
    }

  }
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

    <div className="flex flex-col min-h-screen bg-[#1d1d1d] justify-center items-center">
        
        <div className=" w-70 h-80 bg-[#555555] backdrop-blur-2xl 00 items-center rounded-xl p-6 flex flex-col">

          <span className="text-3xl mt-4 font-bold">56</span>
                  
        </div>

    </div>
  );
}
