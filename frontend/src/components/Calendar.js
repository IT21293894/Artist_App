import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEvent from "./AddEvent";
import axios from "axios";
import moment from "moment";
import Events from "./Events";
import { Button } from "@mui/material";

const Calendar = ({ events }) => {
  const [modelOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);

  const eventsData = events
    ? events.map((event) => ({
        title: event.name,
        start: moment(event.date + " " + event.time).format(
          "YYYY-MM-DDTHH:mm:ss"
        ),
        location: event.location,
        description: event.description,
      }))
    : [];

  const eventContent = (arg) => {
    return (
      <div>
        <strong>{moment(arg.event.start).format("HH:mm")}</strong>
        <p>Name: {arg.event.title}</p>
        <p>Location: {arg.event.extendedProps.location}</p>
        <p>Description: {arg.event.extendedProps.description}</p>
      </div>
    );
  };

  return (
    <section>
      <Button
        sx={{ mt: 2, borderRadius: 4 }}
        variant="contained"
        color="warning"
        onClick={() => setModalOpen(true)}
      >
        Add Event
      </Button>
      <div
        style={{
          position: "relative",
          zIndex: 0,
          height: "10px",
          width: "1500px",
        }}
      >
        <FullCalendar
          ref={calendarRef}
          events={eventsData}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventContent={eventContent}
        />
      </div>
      <AddEvent isOpen={modelOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Calendar;
