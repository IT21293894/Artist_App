import Event from "../model/Event";
import User from "../model/User";
import mongoose from "mongoose";

//Get all events
export const getAllEvent = async (req, res, next) => {
  let events;
  try {
    events = await Event.find();
  } catch (err) {
    console.log(err);
  }
  if (!events) {
    return res.status(404).json({ message: "No Events Found" });
  }
  return res.status(200).json({ events });
};

//Add a new event
export const add = async (req, res, next) => {
  const { name, date, time, location, description } = req.body;
  const event = new Event({
    name,
    date,
    time,
    location,
    description,
  });
  try {
    await event.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(201).json({ event });
};

//Update a Event
export const updateEvent = async (req, res, next) => {
  const { date, time, location, description } = req.body;
  const eventId = req.params.id;
  let event;
  try {
    event = await Event.findByIdAndUpdate(eventId, {
      date,
      time,
      location,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!event) {
    return res.status(500).json({ message: "Unable To Update the Event" });
  }
  return res.status(200).json({ event });
};

//Get event by id
export const getById = async (req, res, next) => {
  const id = req.params.id;

  let event;

  try {
    event = await Event.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!event) {
    return res.status(404).json({ message: "No Event Found" });
  }
  return res.status(200).json({ event });
};

//Delete a event
export const deleteEvent = async (req, res, next) => {
  const id = req.params.id;

  let event;
  try {
    event = await Event.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!event) {
    return res.status(400).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

//Getting the events of the user
export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let userEvents;
  try {
    userEvents = await User.findById(userId).populate("events");
  } catch (err) {
    return console.log(err);
  }
  if (!userEvents) {
    return res.status(404).json({ message: "No Event Found" });
  }
  return res.status(200).json({ events: userEvents });
};
