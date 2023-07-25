import React from "react";
import { Grid, Typography, Box } from "@mui/material";

export default function PricingPage() {
  return (
    <Grid sx={{ height: "100vh" }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Box ml={15} mt={50}>
          <Typography variant="h2">Pricing Page</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
