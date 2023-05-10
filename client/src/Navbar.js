import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  let LoggedOutRoutes = [];
  if (props.isLoggedIn === false) {
    LoggedOutRoutes.push(
      <NavLink to="/Register"> -Register Page </NavLink>,
      <NavLink to="/Login"> -Login Page</NavLink>
    );
  }
  return (
    <div>
      <NavLink to="/Home"> -Homepage </NavLink>
      {props.isLoggedIn === false ? (
        true
      ) : (
        <span>
          <NavLink to={`/Clientlist/${props.UserID}`}> -Client Page </NavLink>
          <NavLink to="/Home" onClick={props.handleLogout}>
            Logout
          </NavLink>
          <NavLink to={`/Dashboard/${props.UserID}`}> -Dashboard</NavLink>
          <NavLink to={`/Create-Group/${props.UserID}`}> -Create Group</NavLink>
          <NavLink to={`/Group-Page/${props.UserID}`}> -Group Page</NavLink>
          <NavLink to={`/Product-Page/${props.UserID}`}>-Product Page</NavLink>
        </span>
      )}

      {LoggedOutRoutes}
    </div>
  );
}
