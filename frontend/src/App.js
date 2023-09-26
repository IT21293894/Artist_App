import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import "react-datetime/css/react-datetime.css";
import Modal from "react-modal";
import Auth from "./components/Auth";
import UserEvents from "./components/UserEvents";
import EventDetail from "./components/EventDetail";
import AddEvent from "./components/AddEvent";
import { useSelector } from "react-redux";
import Events from "./components/Events";

Modal.setAppElement("#root");

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/events" element={<Events />} />
          <Route path="/myEvents" element={<UserEvents />} />
          <Route path="/myEvents/:id" element={<EventDetail />} />
          <Route path="/events/add" element={<AddEvent />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
