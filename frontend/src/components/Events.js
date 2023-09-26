import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/event");
      const data = res.data;
      return data.events;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    sendRequest()
      .then((eventData) => {
        setEvents(eventData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>{loading ? <p>Loading...</p> : <Calendar events={events} />}</div>
  );
};

export default Events;
