import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import ClientEdit from "./LoggedInPages/ClientPages/ClientEdit";
import ClientPage from "./LoggedInPages/ClientPages/ClientPage";
import LoginPage from "./LoggedOutPages/LoginPage";
import RegisterPage from "./LoggedOutPages/RegisterPage";
import Navbar from "./Navbar";
import HomePage from "./LoggedOutPages/HomePage";
import AboutPage from "./LoggedOutPages/AboutPage";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./LoggedInPages/Dashboard";
import GroupCreatePage from "./LoggedInPages/GroupPages/GroupCreatePage";
import GroupPage from "./LoggedInPages/GroupPages/GroupPage";
import ProductPage from "./LoggedInPages/ProductPages/ProductPage";
import ProductEdit from "./LoggedInPages/ProductPages/ProductEdit";
// Theme Provider
import theme from "./Themes/Theme";
import { ThemeProvider } from "@mui/material/styles";
import MiniDrawer from "./DrawerComp";
import FeaturesPage from "./LoggedOutPages/FeaturesPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UserID, setUserID] = useState(null);
  const [groupIDArray, setGroupIDArray] = useState(null);
  const [currentUsername, setCurrentUsername] = useState(null);
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserID(null);
    setGroupIDArray(null);
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

  useEffect(() => {
    const GroupIDs = localStorage.getItem("GroupIDs");
    if (GroupIDs) {
      const convertToArray = JSON.parse(GroupIDs);
      setGroupIDArray(convertToArray);
      console.log(GroupIDs);
    }
  }, [isLoggedIn]);

  console.log(sessionCookie);

  useEffect(() => {
    const Username = localStorage.getItem("Username");
    if (Username) {
      setCurrentUsername(Username);
    }
  });
  return (
    <div>
      <MiniDrawer
        isLoggedIn={isLoggedIn}
        UserID={UserID}
        handleLogout={handleLogout}
        Username={currentUsername}
      ></MiniDrawer>
      {/* <Navbar
        isLoggedIn={isLoggedIn}
        UserID={UserID}
        handleLogout={handleLogout}
      ></Navbar> */}

      <Routes>
        {/* Non protected rouites */}
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/ClientList/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ClientPage
                isLoggedIn={isLoggedIn}
                UserID={UserID}
                groupIDArray={groupIDArray}
              ></ClientPage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Client/Edit/:id"
          element={
            <ClientEdit UserID={UserID} isLoggedIn={isLoggedIn}>
              {" "}
            </ClientEdit>
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
          path="/About"
          element={
            <AboutPage
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              setIsLoggedIn={handleLogin}
            ></AboutPage>
          }
        ></Route>
        <Route
          path="/Features"
          element={
            <FeaturesPage>
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              setIsLoggedIn={handleLogin}
            </FeaturesPage>
          }
        ></Route>

        {/* Protected routes */}
        <Route
          path="/Dashboard/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard UserID={UserID}></Dashboard>
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
        <Route
          path="/Product-Page/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProductPage UserID={UserID}></ProductPage>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/Product/Edit/:productID"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProductEdit UserID={UserID}></ProductEdit>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
