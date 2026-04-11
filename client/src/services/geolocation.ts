/**
 * Geolocation service - handles browser geolocation API
 */

export interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

/**
 * Request user's current location
 * Returns coordinates or null if denied/unavailable
 */
export async function getUserLocation(): Promise<GeolocationCoords | null> {
  if (!navigator.geolocation) {
    console.warn("Geolocation not supported by browser");
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log("Geolocation granted");
      },
      (error) => {
        console.warn("Geolocation denied:", error.message);
        resolve(null);
      }
    );
  });
}
