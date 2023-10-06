import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const labelStyles = { mb: 1, mt: 2, fontSize: "16px", fontWeight: "bold" };

const EventDetail = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //get the id of the event
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/event/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  //get the data of the event
  useEffect(() => {
    fetchDetails().then((data) => {
      setEvent(data.event);
      setInputs({
        name: data.event.name,
        date: data.event.date,
        time: data.event.time,
        location: data.event.location,
        description: data.event.description,
      });
    });
  }, [id]);

  //sending the request to the backend to update the event
  const sendRequest = async () => {
    const res = axios
      .put(`http://localhost:5000/api/event/update/${id}`, {
        name: inputs.name,
        date: inputs.date,
        time: inputs.time,
        location: inputs.location,
        description: inputs.location,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(event);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/events/"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(25,19,129,1) 0%, rgba(165,40,227,1) 50%, rgba(25,19,129,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"50%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h4"
              textAlign={"center"}
            >
              Post Your Event
            </Typography>

            <InputLabel sx={labelStyles}>Date</InputLabel>
            <input
              type="date"
              name="date"
              onChange={handleChange}
              value={inputs.date}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Tme</InputLabel>
            <input
              type="time"
              name="time"
              onChange={handleChange}
              value={inputs.time}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Location</InputLabel>
            <TextField
              name="location"
              onChange={handleChange}
              value={inputs.location}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Brief Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin="normal"
              variant="outlined"
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default EventDetail;
