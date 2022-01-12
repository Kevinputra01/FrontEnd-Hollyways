import React from "react";
import { NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Ava from "../../../assets/img/ava.png";
import Polygon from "../../../assets/img/Polygon.png";
import ProfileIcon from "../../../assets/img/profileicon.png";
import FundIcon from "../../../assets/img/fundicon.png";
import LogoutIcon from "../../../assets/img/logouticon.png";

import "./ConditionalNavbar.css";

export default function ConditionalNavbar(props) {
  return (
    <div>
      {props.isLogin ? (
        <>
          <NavDropdown align="end" title={<img src={Ava} width="50px" height="50px" alt="" className="rounded-circle" />} id="dropdown-menu-align-end">
            <img src={Polygon} alt="ico" className="position-absolute" style={{ top: "-20px", left: "80%", width: "30px" }} />
            <Link className="fw-bold my-2 dropdown-item" to="/profile">
              <img src={ProfileIcon} className="me-2" alt="ico" /> Profile
            </Link>
            <Link className="fw-bold my-2 dropdown-item" to="/raise-fund">
              <img src={FundIcon} className="me-2" alt="ico" /> Raise Fund
            </Link>
            <NavDropdown.Divider />
            <Link className="fw-bold my-2 dropdown-item" to="/" onClick={props.handleLogout}>
              <img src={LogoutIcon} className="me-2" alt="ico" /> Logout
            </Link>
          </NavDropdown>
        </>
      ) : (
        <>
          <Button variant="danger" onClick={props.handleShowLogin} className="me-2 px-3">
            Login
          </Button>
          <Button variant="light" onClick={props.handleShowRegister} className="me-2 text-danger">
            Register
          </Button>
        </>
      )}
    </div>
  );
}
