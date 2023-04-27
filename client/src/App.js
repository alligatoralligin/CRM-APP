import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import ClientEdit from "./ClientEdit";
import ClientPage from "./ClientPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import GroupCreatePage from "./GroupCreatePage";
import GroupPage from "./GroupPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UserID, setUserID] = useState(null);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserID(null);
  };

  let sessionCookie = document.cookie;
  //Checking if Local Storage log in state is available and if so set it to that state
  useEffect(() => {
    const LoginState = localStorage.getItem("IS_LOGGED_IN");
    if (LoginState) {
      setIsLoggedIn(localStorage.getItem("IS_LOGGED_IN"));
    }
  });

  //Checking to see if local storage for ID is empty

  useEffect(() => {
    const ID = localStorage.getItem("UserID");
    if (ID) {
      setUserID(ID);
    }
  }, [isLoggedIn]);

  console.log(sessionCookie);
  return (
    <div>
      <Navbar
        isLoggedIn={isLoggedIn}
        UserID={UserID}
        handleLogout={handleLogout}
      ></Navbar>
      <Routes>
        <Route path="/Home" element={<HomePage></HomePage>}></Route>
        <Route
          path="/ClientList/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ClientPage isLoggedIn={isLoggedIn} UserID={UserID}></ClientPage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Client/Edit/:id"
          element={
            <ClientEdit UserID={UserID} isLoggedIn={isLoggedIn}></ClientEdit>
          }
        ></Route>
        <Route
          path="/Login"
          element={
            <LoginPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={handleLogin}
            ></LoginPage>
          }
        ></Route>
        <Route
          path="/Register"
          element={
            <RegisterPage
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              setIsLoggedIn={handleLogin}
            ></RegisterPage>
          }
        ></Route>
        <Route
          path="/Dashboard/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard></Dashboard>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Create-Group/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <GroupCreatePage UserID={UserID}></GroupCreatePage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Group-Page/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <GroupPage UserID={UserID}></GroupPage>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
