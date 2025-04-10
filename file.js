async function fetchForecast() {
    const API_KEY = "f3051302b198b4eaea37dd4b9e21ff67"; // Replace with your API key
    const city = "Hyderabad";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.list) {
            console.error("Invalid API response:", data);
            return;
        }

        const tableBody = document.querySelector("#weatherTable tbody");
        tableBody.innerHTML = data.list
            .filter((_, index) => index % 8 === 0) // Pick one entry per day
            .map(entry => {
                const date = new Date(entry.dt * 1000).toLocaleDateString();
                const temp = entry.main.temp.toFixed(1);
                return `<tr><td>${date}</td><td>${temp}°C</td></tr>`;
            })
            .join(""); // Convert array to a single HTML string

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

fetchForecast();
