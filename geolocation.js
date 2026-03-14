if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const locationData = {
        coords: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        },
        timestamp: Date.now(),
      };
      localStorage.setItem('userLocation', JSON.stringify(locationData));

      const el = document.getElementById('location-display');
      if (el) {
        el.innerHTML =
          `<i class="fa-solid fa-location-dot"></i> ` +
          `${locationData.coords.lat.toFixed(5)}, ${locationData.coords.lng.toFixed(5)} ` +
          `<span>(±${Math.round(locationData.coords.accuracy)}m)</span>`;
      }
    },
    function (error) {
      const errorMessages = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timed out',
      };
      const message = errorMessages[error.code] || 'Unknown error';
      localStorage.setItem('userLocationError', message);

      const el = document.getElementById('location-display');
      if (el) {
        el.textContent = 'Location: ' + message;
        el.style.opacity = '0.5';
      }
    },
  );
}
