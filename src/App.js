import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import "./App.css";
import AuthContext from "./store/authContext";

import Header from "./components/Header";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Form from "./components/Form";
import Profile from "./components/Profile";

const App = () => {
  const { state } = useContext(AuthContext);
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={!state.token ? <Auth /> : <Navigate to="/" />}
        />
        <Route
          path="/form"
          element={state.token ? <Form /> : <Navigate to="/auth" />}
        />
        //* Checks to see if token is present if it is then take them to the
        form, otherwise direct them to log in */
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
