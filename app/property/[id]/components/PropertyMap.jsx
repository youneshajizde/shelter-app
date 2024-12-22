"use client";

import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // ShadCN Dialog components
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet styles

// Dynamically import React Leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Fix Leaflet marker issue
const customIcon = new L.Icon({
  iconUrl: "/custom-marker.png", // Custom marker icon in the public folder
  iconSize: [25, 41], // Adjust size as needed
  iconAnchor: [12, 41], // Anchor point of the icon
  popupAnchor: [1, -34], // Popup position
  shadowUrl: "/leaflet/marker-shadow.png", // Optional: add shadow
});

function PropertyMap({
  houseName,
  coordinates = [37.0902, -95.7129], // Default to center of U.S.
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative w-full h-[300px] rounded-3xl overflow-hidden cursor-pointer group">
          <MapContainer
            center={[37.0902, -95.7129]} // Center of the United States
            zoom={4} // Adjusted zoom level
            scrollWheelZoom={false}
            className="w-full h-full rounded-3xl"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={coordinates} icon={customIcon}>
              <Popup>{houseName}</Popup>
            </Marker>
          </MapContainer>
       
        </div>
      </DialogTrigger>

      <DialogContent className="w-full max-w-4xl h-[500px] p-0 overflow-hidden">
        <MapContainer
          center={[37.0902, -95.7129]}
          zoom={4}
          scrollWheelZoom={false}
          className="w-full h-full rounded-3xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates} icon={customIcon}>
            <Popup>{houseName}</Popup>
          </Marker>
        </MapContainer>
      </DialogContent>
    </Dialog>
  );
}

export default PropertyMap;
