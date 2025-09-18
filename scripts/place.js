//  Footer Year & Last Modified 
document.addEventListener("DOMContentLoaded", () => {
  // Current Year
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("last-modified");

  const now = new Date();
  if (yearSpan) yearSpan.textContent = now.getFullYear();
  if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;

  // Weather: Windchill Calculation
  const temperature = 5;   // °C (example static value)
  const windSpeed = 15;    // km/h (example static value)

  const windChillOutput = document.getElementById("windchill");

  function calculateWindChill(tempC, speedKmH) {
    return (
      13.12 +
      0.6215 * tempC -
      11.37 * Math.pow(speedKmH, 0.16) +
      0.3965 * tempC * Math.pow(speedKmH, 0.16)
    ).toFixed(1); // round to 1 decimal
  }

  let windChillText = "N/A";

  if (temperature <= 10 && windSpeed > 4.8) {
    windChillText = `${calculateWindChill(temperature, windSpeed)} °C`;
  }

  if (windChillOutput) {
    windChillOutput.textContent = windChillText;
  }
});
