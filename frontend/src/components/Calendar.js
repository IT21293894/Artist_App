import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import AddEvent from "./AddEvent";
import moment from "moment";
import Events from "./Events";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Calendar = ({ events }) => {
  const navigate = useNavigate();
  const [modelOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);

  const eventsData = events
    ? events.map((event) => ({
        id: event._id,
        title: event.name,
        start: moment(event.date + " " + event.time).format(
          "YYYY-MM-DDTHH:mm:ss"
        ),
        location: event.location,
        description: event.description,
      }))
    : [];

  const eventContent = (arg) => {
    const eventId = arg.event.id;

    const handleEdit = (id) => {
      navigate(`/myEvents/${id}`);
    };

    const deleteRequest = async (id) => {
      const res = await axios
        .delete(`http://localhost:5000/api/event/${id}`)
        .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this event?")) {
        deleteRequest(id)
          .then((data) => {
            console.log(data);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    };

    return (
      <div>
        <strong>{arg.event.title}</strong>
        <p>
          <strong>Time : {moment(arg.event.start).format("HH:mm")}</strong>
        </p>

        <p>Location: {arg.event.extendedProps.location}</p>
        <p>Description: {arg.event.extendedProps.description}</p>
        <IconButton
          onClick={() => handleEdit(eventId)}
          sx={{ marginLeft: 17, color: "black" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(eventId)}
          sx={{ marginRight: 15, color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
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
