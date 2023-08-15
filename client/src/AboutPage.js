import React from "react";
import { Grid, Typography, Box } from "@mui/material";

export default function AboutPage() {
  return (
    <Grid sx={{ height: "100vh" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Box ml={15} mt={50}>
          <Typography variant="h2" fontWeight="medium" gutterBottom>
            About CRM-MERN
          </Typography>
          <Box
            sx={{
              maxWidth: "500px",
              border: 1,
              borderRadius: "2%",
              padding: 3,
            }}
          >
            <Typography variant="p">
              {" "}
              CRM-MERN is a Customer Relationship Management web app that allows
              companies to add,track, and manage,clients. CRM-MERN allows
              companies to create a Sales Group to add members. Build lasting
              relationships with customers by keeping track of their details
              using the notes features. Keep track of customers sales pipline
              status so that your sales group members will be organized and be
              able to prioritize urgent cases. Add products to the Sales Group
              to keep track of products being sold{" "}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
