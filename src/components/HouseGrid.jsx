import { useEffect, useState } from "react";
import api from "../api/api";
import HouseCard from "./HouseCard";
import "../styles/houses.css";

const HouseGrid = () => {
  const [houses, setHouses] = useState([]);
  

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await api.get("/houses");
        setHouses(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHouses();
  }, []);

  return (
    <div className="page">
      <h1 className="title">Available Houses</h1>

      <div className="grid">
        {houses.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default HouseGrid;