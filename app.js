
    
    const URL = "https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current_weather=true"; // API URL

    fetch(URL)
    .then(response => { // API Response 
        console.log("Response : ", response);
        return response.json() // unwrap json package        
    })

   .then(data => { 
         console.log(data);
         const meteo = data.current_weather; 
 
          const Weather = document.getElementById("temperature");
          Weather.textContent = `${meteo.temperature}  °C`;
          document.getElementById("windSpeed").textContent = `${meteo.windspeed} km/h`
          document.getElementById("windDirection").textContent = `${meteo.windirection}km/h`
    })
    .catch(error => {

        Weather.textContent = "Données indisponible";
        console.error("Erreur:", error);
    });

