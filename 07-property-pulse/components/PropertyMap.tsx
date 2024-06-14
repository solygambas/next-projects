"use client";

import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import Image from "next/image";
import Spinner from "./Spinner";
import { PropertyInterface } from "@/models/Property";
import pin from "@/assets/images/pin.svg";

interface ViewportInterface {
  latitude: number;
  longitude: number;
  zoom: number;
  width: string;
  height: string;
}

const PropertyMap = ({ property }: { property: PropertyInterface }) => {
  const [lat, setLat] = useState<number>(28.7040592);
  const [lng, setLng] = useState<number>(77.1024902);
  const [viewport, setViewport] = useState<ViewportInterface>({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [geocodeError, setGeocodeError] = useState<boolean>(false);

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const { street, city, state, zipcode } = property.location;
        const address = `${street} ${city} ${state} ${zipcode}`;
        const encodedAddress = encodeURIComponent(address);
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
        );
        const data = await response.json();
        if (data.features.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }
        const [lng, lat] = data.features[0].center;
        setLng(lng);
        setLat(lat);
        setViewport({
          ...viewport,
          latitude: lat,
          longitude: lng,
        });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (geocodeError) {
    return (
      <div>
        <p className="text-xl">No location data found</p>
      </div>
    );
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};
export default PropertyMap;
