import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard(props) {
  // const [dashBoardInfo, setDashBoardInfo] = useState("");

  useEffect(() => {
    async function getDashBoardInfo() {
      try {
        await axios.get(`http://localhost:8000/dashboard/${props.UserID}`, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
      } catch (error) {
        console.log(error);
      }
    }
    getDashBoardInfo();
  }, []);
  return (
    <div>
      <h1>Sales Total By Sales Rep</h1>
    </div>
  );
}

export default Dashboard;
