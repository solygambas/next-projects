import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function EventMap({ singleEvent }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: "100%",
    height: "500px",
    zoom: 12,
  });

  useEffect(() => {
    const getGeocodeFromAddress = async () => {
      const res = await fetch(
        `https://www.mapquestapi.com/geocoding/v1/address?key=${process.env.NEXT_PUBLIC_MAPQUEST_API_KEY}&location=${singleEvent.address}`
      );
      if (res.ok) {
        const data = await res.json();
        const { lat, lng } = data.results[0].locations[0].displayLatLng;
        setLatitude(lat);
        setLongitude(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      }
    };
    getGeocodeFromAddress();
  }, []);

  if (loading) return false;

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={singleEvent.id} latitude={latitude} longitude={longitude}>
        <Image src="/images/pin.svg" width={30} height={30} alt="" />
      </Marker>
    </ReactMapGL>
  );
}
