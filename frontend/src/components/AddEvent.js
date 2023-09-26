import React, { useState } from "react";
import Modal from "react-modal";

import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
const labelStyles = { mb: 1, mt: 2, fontSize: "16px", fontWeight: "bold" };

const AddEvent = ({ isOpen, onClose, onEventAdded }) => {
  const [inputs, setInputs] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/event/add", {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data));
    onClose();
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
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
          <InputLabel sx={labelStyles}>Event Name</InputLabel>
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            margin="normal"
            variant="outlined"
          />
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
    </Modal>
  );
};

export default AddEvent;
