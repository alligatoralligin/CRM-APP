import axios from "axios";
import React, { useEffect, useState } from "react";

//Chart.js imports
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Data } from "./ChartData/Data";
import BarChart from "./Charts/BarChart";

function Dashboard(props) {
  const [totalContactsInfo, setTotalContactsInfo] = useState("");
  const [clientPerUser, setClientPerUser] = useState("");
  const [chartData, setChartData] = useState("");

  useEffect(() => {
    if (clientPerUser) {
      setChartData({
        labels: clientPerUser.map((data) => data.username),
        datasets: [
          {
            label: "Clients Per User ",
            data: clientPerUser.map((data) => data.Contacts.length),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "&quot;#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    }
  }, [clientPerUser]);

  useEffect(() => {
    async function getDashBoardInfo() {
      try {
        const dashboardResp = await axios.get(
          `http://localhost:8000/dashboard/${props.UserID}`,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );
        console.log(dashboardResp);
        setTotalContactsInfo(dashboardResp.data.groupContacts);
        setClientPerUser(dashboardResp.data.userByGroupID);
      } catch (error) {
        console.log(error);
      }
    }
    getDashBoardInfo();
  }, []);
  let totalContacts = [];

  if (totalContactsInfo[0]) {
    totalContacts.push(totalContactsInfo[0]["Contacts"]);
  }

  //Showing the clients that each Users has
  let nameToClients = [];
  if (clientPerUser) {
    for (let i = 0; i < clientPerUser.length; i++) {
      nameToClients.push(
        <div>
          <p>Username:{clientPerUser[i].username}</p>
          <p>Clients:{clientPerUser[i].Contacts.length}</p>
        </div>
      );
    }
  }
  let BarChartRender;
  if (chartData) {
    BarChartRender = (
      <BarChart chartData={chartData} headerInfo={"Client Per User "} />
    );
  }

  return (
    <div>
      <h1>Sales Total By Sales Rep</h1>
      <h2>Total Customers:{totalContacts}</h2>
      <div>
        <h2>Clients per User Chart</h2>
        {nameToClients}
      </div>
      {BarChartRender}
    </div>
  );
}

export default Dashboard;

//group aggregates from salesgroup
// salesgroup contains a reference of Users which contains a reference of contacts

//  Users: [
// [0]     {
// [0]       Groups: [],
// [0]       _id: new ObjectId("643f460efab971148bdb9f03"),
// [0]       Email: 'ttt@gmail.com',
// [0]       Contacts: [],
// [0]       username: 'ttt',
// [0]       __v: 0
// [0]     },
// [0]     {
// [0]       Groups: [],
// [0]       _id: new ObjectId("643f4c254f3bb4040f316f91"),
// [0]       Email: 'gary@gmail.com',
// [0]       Contacts: [],
// [0]       username: 'gary',
// [0]       __v: 0
// [0]     }
// [0]   ]

// Instead of aggregating in group, I will aggregate in the Client list based on group Id that is created with the
