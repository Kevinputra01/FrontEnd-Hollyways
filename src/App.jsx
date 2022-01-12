import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//components
import NavBar from "./components/Navbar/NavBar";

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RaiseFund from "./pages/RaiseFund";
import DetailDonate from "./pages/DetailDonate";
import MakeFund from "./pages/MakeFund";
import EditFund from "./pages/EditFund";
import ViewFund from "./pages/ViewFund";

//context
import PrivateRoute from "./context/PrivateRoute";
import { UserContext } from "./context/UserContext";

import { API, setAuthToken } from "./config/api";

//check token in localstorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/detail-donate/:id" component={DetailDonate} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/raise-fund" component={RaiseFund} />
        <PrivateRoute exact path="/view-fund/:id" component={ViewFund} />
        <PrivateRoute exact path="/make-fund" component={MakeFund} />
        <PrivateRoute exact path="/edit-fund/:id" component={EditFund} />
      </Switch>
    </Router>
  );
}

export default App;
