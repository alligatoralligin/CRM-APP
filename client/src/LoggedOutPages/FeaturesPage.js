import React from "react";
import { Typography, Grid } from "@mui/material";
import ActionAreaCard from "../HelperComps/ActionAreaCard";
import ClientPageScreenshot from "../Images/ClientPageScreenshot.png";
import DashboardScreenshot from "../Images/DashboardScreenshot.png";
import AddProductPageScreenshot from "../Images/AddProductPageScreenshot.png";

function FeaturesPage() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{
        height: "100vh",
        background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
      }}
    >
      <Typography variant="h2" mt={20} gutterBottom mb={10}>
        Features
      </Typography>

      <Grid container spacing={2} width={3 / 5}>
        <Grid item xs={4}>
          <ActionAreaCard
            title="Manage Your Clients At Ease"
            description="CRM-MERN allows you to be in control. Add or delete clients and add notes to give your clients the attention they deserve.Freely edit client details and set the status of the sales pipeline to keep clients organized so that you can make that sale. Keep track of progress made on clients"
            picture={ClientPageScreenshot}
          ></ActionAreaCard>
        </Grid>

        <Grid item xs={4}>
          <ActionAreaCard
            title="CRM-MERN Dashboard"
            description="The Dashboard features shows snapshots and graphs of the data from the sales members of your group as well as infomration on clients.The Dashboard allows CRM-MERN users to visualize data that is collected on the app"
            picture={DashboardScreenshot}
          ></ActionAreaCard>
        </Grid>
        <Grid item xs={4}>
          <ActionAreaCard
            title="Add Products to your Sales Group"
            description="CRM-MERN features the ability to add product and service to your sales group.Add products and services that your company offers to the sales group so that salesgroup members can keep track of products sold to which client."
            picture={AddProductPageScreenshot}
          ></ActionAreaCard>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FeaturesPage;
