import axios from "axios";
import React, { useEffect, useState } from "react";

//Chart.js imports
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import { Data } from "./ChartData/Data";
import BarChart from "./Charts/BarChart";
import DoughnutChart from "./Charts/DoughnutChart";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import DashBoardCard from "./DBComponents/DashBoardCard";
import CircularPercent from "./DBComponents/CircularPercent";
import satisfied64 from "./Icons/satisfied64.png";
import new64 from "./Icons/new64.png";
import closing64 from "./Icons/closing64.png";
import failure64 from "./Icons/failure64.png";
import account64 from "./Icons/account64.png";
import employees64 from "./Icons/employees64.png";
import opportunity64 from "./Icons/opportunity64.png";

function Dashboard(props) {
  const [totalContactsInfo, setTotalContactsInfo] = useState("");
  //totalContactsInfo is the count of Users in the SalesGroup
  const [clientPerUser, setClientPerUser] = useState("");
  const [chartData, setChartData] = useState("");

  // Bar chart data
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
  //Doughnut Chart Data

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
      <BarChart
        chartData={chartData}
        headerInfo={"Client Per User "}
        chartTitle={"Client Total By Sales Rep"}
      />
    );
  }
  // Doughnut Chart Render
  let DoughnutChartRender;
  if (chartData) {
    DoughnutChartRender = (
      <DoughnutChart
        chartData={chartData}
        headerInfo={"Total Client Status "}
        chartTitle={"Total Client Status"}
      />
    );
  }

  //Showing the total number of clients in the Success Status
  console.log(clientPerUser);
  let ContactArray = [];
  for (let i = 0; i < clientPerUser.length; i++) {
    for (let x = 0; x < clientPerUser[i].Contacts.length; x++) {
      ContactArray.push(clientPerUser[i].Contacts[x]);
    }
  }
  console.log(ContactArray);

  const SuccessCount = ContactArray.filter(
    (obj) => obj.ContactStatus === "Success"
  ).length;
  console.log(SuccessCount);

  //Showing the total number of clients in the Failure Status
  const FailureCount = ContactArray.filter(
    (obj) => obj.ContactStatus === "Failure"
  ).length;
  console.log(FailureCount);

  //Showing the total number of clients in the closing Status
  const closingCount = ContactArray.filter(
    (obj) => obj.ContactStatus === "closing"
  ).length;
  console.log(closingCount);

  //Showing the total number of clients in the opportunity Status
  const opportunityCount = ContactArray.filter(
    (obj) => obj.ContactStatus === "opportunity"
  ).length;
  console.log(opportunityCount);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", mt: 10 }}
    >
      <Typography variant="h3" gutterBottom>
        {window.localStorage.getItem("Username")}'s Dashboard
      </Typography>

      {/* Placeholder Dashboard Content */}
      <Box className="cardRowTop" sx={{ display: "flex", mt: 10 }}>
        <DashBoardCard
          cardTitle="New Accounts"
          cardStat="153"
          cardPercent="58"
          icon={new64}
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Number of Satisfied Customers"
          cardStat={SuccessCount}
          cardPercent="62"
          icon={satisfied64}
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Total SalesGroup Users"
          cardStat={totalContacts}
          cardPercent="72"
          icon={account64}
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="New Employees"
          cardStat="+34"
          cardPercent="81"
          icon={employees64}
        ></DashBoardCard>
      </Box>
      <Box className="middleChartRow" sx={{ display: "flex", mt: 10 }}>
        <Card variant="outlined" sx={{ boxShadow: 1, mr: 10 }}>
          <CardContent>
            <div
              class="chart-container"
              style={{ height: "400px", width: "700px" }}
            >
              {BarChartRender}
            </div>
          </CardContent>
        </Card>
        <Card variant="outlined" sx={{ boxShadow: 1, mr: 10 }}>
          <CardContent>{DoughnutChartRender}</CardContent>
        </Card>
      </Box>
      <Box className="cardRowBottom" sx={{ display: "flex", mt: 10 }}>
        <DashBoardCard
          cardTitle="Total Customers at the Failure Status"
          cardStat={FailureCount}
          icon={failure64}
          cardPercent="58"
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Total Customers at the Closing Status"
          cardStat={closingCount}
          cardPercent="62"
          icon={closing64}
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Total Potential Customers"
          cardStat={opportunityCount}
          cardPercent="72"
          icon={opportunity64}
        ></DashBoardCard>
        <DashBoardCard
          cardTitle="Totals"
          cardStat="+34"
          cardPercent="81"
        ></DashBoardCard>
      </Box>
    </Grid>
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
