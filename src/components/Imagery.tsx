import React, { useEffect, useState } from "react";
import Card from "./Card";
import { MouseEvent } from "react";

const Imagery: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [lat, setLat] = useState("37.566536");
  const [lon, setLon] = useState("126.977966");
  const [date, setDate] = useState("2014-01-01");

  useEffect(() => {
    fetchImage(lat, lon, date);
  }, []);

  const fetchImage = async (lat: string, lon: string, date: string) => {
    try {
      const DEMO_KEY = import.meta.env.VITE_API_KEY;
      const baseUrl = "https://api.nasa.gov/planetary/earth/imagery";

      // "2018-01-01"
      const dim = "0.1";

      const url = new URL(baseUrl);
      url.searchParams.append("api_key", DEMO_KEY);
      url.searchParams.append("lat", lat);
      url.searchParams.append("lon", lon);
      url.searchParams.append("date", date);
      url.searchParams.append("dim", dim);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const link = URL.createObjectURL(blob);
      setImageUrl(link);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (key: string, value: string) => {

    if(key === "lat") {
        setLat(value)

    }
    if(key === "lon") {
        setLon(value)

    }

    if(key === "date") {
        setDate(value)

    }
  }

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();

    fetchImage(lat, lon, date);
  }

  return (
    <>
      <Card>
        <h2 style={{ color: "#222831" }}>Landsat Imagery</h2>
        <div style={{ margin: "0.5rem auto" }}>
          <label
            style={{
              width: "10rem",
              marginRight: "2rem",
              textAlign: "left",
              display: "inline-block",
            }}
          >
            위도(latitude)
          </label>
          <input 
          style={{ width: "10rem" }} 
          type="text"
          name="lat"
          onChange={(event) => handleChange("lat", event.target.value)} 
          
          />
        </div>
        <div style={{ margin: "0.5rem auto" }}>
          <label
            style={{
              width: "10rem",
              marginRight: "2rem",
              textAlign: "left",
              display: "inline-block",
            }}
          >
            경도(longitude)
          </label>
          <input 
          style={{ width: "10rem" }} 
          type="text" 
          name="lon"
          onChange={(event) => handleChange("lon", event.target.value)} 
          
          />
        </div>
        <div style={{ margin: "0.5rem auto" }}>
          <label
            style={{
              width: "10rem",
              marginRight: "2rem",
              textAlign: "left",
              display: "inline-block",
            }}
          >
            날짜(Date)
          </label>
          <input 
          style={{ width: "10rem" }} 
          type="date"
          name="date"
          onChange={(event) => handleChange("date", event.target.value)} 
          />
        </div>
        <div style={{ margin: "0.5rem auto" }}><button onClick={handleSubmit}>검색</button></div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop : '1rem'
          }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="NASA Earth Imagery"
              style={{ width: "40%" }}
            />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default Imagery;
// https://api.nasa.gov/
