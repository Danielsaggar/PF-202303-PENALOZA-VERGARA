import React, { useRef, useState, useEffect } from "react";
import * as Location from "expo-location";

const useMapaLogic = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
        },
        (location) => setLocation(location)
      );
    })();
  }, []);

  return {
    location,
  };
};
export default useMapaLogic;
